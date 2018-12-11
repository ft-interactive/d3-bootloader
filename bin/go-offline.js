#!/usr/bin/env node
/**
 * @file
 * Runtime for downloading appropriate deps for offline us
 */

const cheerio = require("cheerio");
const Axios = require("axios");
const execa = require("execa");
const tmp = require("tmp");
const npm = require("npm");
const pacote = require("pacote");
const { readFileSync, writeFileSync, createWriteStream } = require("fs");

(async () => {
  try {
    console.info("Checking d3-bootloader version...");
    const index = readFileSync(`${process.cwd()}/index.html`, "utf-8");
    const $ = cheerio.load(index);
    const bootloaderTag = $(
      $("script")
        .toArray()
        .find(d => {
          return /d3-bootloader/.test($(d).attr("src"));
        })
    );
    let version;
    const bootloaderUrl = bootloaderTag.attr("src");

    if (!bootloaderUrl) {
      throw new Error(
        "Unable to locate D3 bootloader; have you run `offline` in a directory with an index.html file?"
      );
    } else if (
      /unpkg.com\/@financial-times\/d3-bootloader@/.test(bootloaderUrl)
    ) {
      console.error(
        "Using a specified version of d3-bootloader deps is current unsupported."
      );
      console.info("Falling back to using `latest` release.");
      version = "latest";
      // @TODO write version handling logic
    } else {
      version = "latest";
      console.info("Using `latest` release dependencies.");
    }

    const downloadUrl = `https://api.github.com/repos/ft-interactive/d3-bootloader/tarball/${version}`;

    console.info("Downloading dependencies...");

    // Create a tmp file
    const tmpFile = tmp.fileSync();

    // Download tarball to tmpfile
    await pacote.tarball.toFile(
      `@financial-times/d3-bootloader@${version}`,
      tmpFile.name
    );

    console.info("Download complete.");
    console.info("Extracting...");

    // Create tmp dir.
    const tmpDir = tmp.dirSync();

    // Extract to tmp dir
    await execa("tar", ["-C", tmpDir.name, "--strip=1", "-xzvf", tmpFile.name]);

    // Move tmpDir/offline to $CWD
    await execa("mv", [`${tmpDir.name}/offline`, process.cwd()]);

    // Remove tmp dir.
    tmpDir.removeCallback();

    // Remove the tarball
    tmpFile.removeCallback();

    // Write updated index.html to $CWD
    console.info("Updating index.html...");
    bootloaderTag.attr("src", "./offline/index.js");
    writeFileSync(`${process.cwd()}/index.html`, $.html());

    console.info("Done!");
  } catch (e) {
    console.error(e);
  }
})();
