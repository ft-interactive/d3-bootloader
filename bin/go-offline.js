#!/usr/bin/env node
/**
 * @file
 * Runtime for downloading appropriate deps for offline us
 */

const cheerio = require("cheerio");
const Axios = require("axios");
const execa = require("execa");
const { readFileSync, writeFileSync } = require("fs");

(async () => {
  try {
    const index = readFileSync(`${process.cwd()}/index.html`, "utf-8");
    const $ = cheerio.load(index);
    const bootloaderUrl = $("script")
      .toArray()
      .find(d => /d3-bootloader/.test(d.getAttribute("src")));
    let version;

    if (!bootloaderUrl) {
      throw new Error(
        "Unable to locate D3 bootloader; have you run `offline` in a directory with an index.html file?"
      );
    } else if (bootloaderUrl.indexOf("@") > -1) {
      // @TODO write version handling logic
    } else {
      version = "master";
    }

    const downloadUrl = `https://api.github.com/repos/financial-times/d3-bootloader/tarball/${version}`;
    const outPath = `${process.cwd()}/offline.tgz`;

    // axios image download with response type "stream"
    const response = await Axios({
      method: "GET",
      url: url,
      responseType: "stream"
    });

    // pipe the result stream into a file on disc
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

    execa("tar", ["-xzvf", outPath]);
  } catch (e) {
    console.error(e);
  }
})();
