// describe("Index tests", () => {
//   it("[index] Sample test", () => {
//     expect(-1).toEqual(-1);
//   });
// });

// https://github.com/microsoft/vscode-test/blob/dfda6030050f0b9c4c1a2af637757e2add0112e8/sample/src/test/suite/index.ts
// import * as path from 'path';
// import * as Mocha from 'mocha';
// import * as glob from 'glob';
const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
  // Create the mocha test
  const mocha = new Mocha({
    // ui: 'tdd'
    ui: 'bdd'
  });

  // console.log('================== ', testsRoot, glob.globSync('**/**.test.js', { cwd: testsRoot }));
  // process.exit(0);

  const testFiles = glob.globSync('**/**.test.js', { cwd: testsRoot });

  for (const file of testFiles) {
    mocha.addFile(path.resolve(testsRoot, file));
  }

  console.log('=======================================================');
  console.log('=======================================================');
  console.log('=======================================================');

  try {
    // Run the mocha test
    mocha.run(failures => {
      cb(null, failures);
    });
  } catch (err) {
    //? TODO: mocha must be installed globally, otherwise it will throw an error (solved??))
    // to solve: npm install mocha -g
    console.error('--- catch error ---');
    console.error(err);
    cb(err);
  }
}