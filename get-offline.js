/**
 * @file
 * Offline support
 */

import Axios from 'axios';
import path from 'path';
import { createWriteStream } from 'fs';
import modules from './modules';

Promise.all(Object.entries(modules).map(item => downloadDependency(...item)))
  .then(() => console.log('Done!'))
  .catch(console.error);

async function downloadDependency(pkg, origUrl) {
  const url = origUrl.replace('npm:', 'https://unpkg.com/');
  const pkgName = /d3js\.org\/d3\./.test(url)
    ? 'd3'
    : /^@/.test(pkg)
    ? pkg.slice(pkg.indexOf('/') + 1)
    : pkg;
  const outFile = path.resolve(__dirname, 'offline', `${pkgName}.js`);
  console.log(pkgName, url);

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url,
    responseType: 'stream',
  });

  // pipe the result stream into a file on disc
  response.data.pipe(createWriteStream(outFile));

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', () => {
      reject();
    });
  });
}
