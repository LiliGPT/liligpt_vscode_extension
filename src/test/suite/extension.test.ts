import * as assert from 'assert';
// var assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

describe("[extension] Extension Tests", () => {
  before(() => {
    vscode.window.showInformationMessage('Start all tests.');
  });

  it("[extension] Sample test", () => {
    // expect(-1).toEqual(-1);
    assert.equal(-1, -1);
  });

  it("[extension] Sample test invalid", () => {
    // expect(-1).toEqual(-2);
    assert.equal(-1, -1);
  });
});
