#!/usr/bin/env node
/**
 * @file
 * Runtime for downloading appropriate deps for offline us
 */

const cheerio = require("cheerio");
const Axios = require("axios");
const execa = require("execa");
const rimraf = require("rimraf");
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
      console.info("Falling back to using `master` branch.");
      version = "master";
      // @TODO write version handling logic
    } else {
      version = "master";
      console.info("Using `master` branch dependencies.");
    }

    const downloadUrl = `https://api.github.com/repos/ft-interactive/d3-bootloader/tarball/${version}`;
    const outPath = `${process.cwd()}/offline.tgz`;

    console.info("Downloading dependencies...");
    const response = await Axios({
      method: "GET",
      url: downloadUrl,
      responseType: "stream"
    });

    // pipe the result stream into a file on disk
    response.data.pipe(createWriteStream(outPath));

    // return a promise and resolve when download finishes
    await new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", () => {
        reject();
      });
    });

    console.info("Download complete.");
    console.info("Extracting...");
    await execa("mkdir", [`${process.cwd()}/offline-tmp`]);
    await execa("tar", ["-c", "offline-tmp", "--strip=1", "-xzvf", outPath]);
    await execa("mv", [`${process.cwd()}/offline-tmp/offline`, process.cwd()]);
    await new Promise(res => rimraf(`${process.cwd()}/offline-tmp`, res));

    console.info("Updating index.html...");
    bootloaderTag.attr("src", "./offline/index.js");
    writeFileSync(`${process.cwd()}/index.html`, $.html());

    console.info("Done!");
  } catch (e) {
    console.dir(e);
    console.error(e);
  }
})();
