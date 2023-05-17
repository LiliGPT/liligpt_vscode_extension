import * as assert from 'assert';
import * as vscode from 'vscode';
import { fileExists } from '../../../../actions/io/fileExists.action';

describe('actions/io/fileExists.action.ts', () => {
  it('this test should exist', () => {
    assert.equal(fileExists('src/test/suite/actions/io/fileExists.action.test.ts'), true);
  });

  it('invalid file should not exist', () => {
    assert.equal(fileExists('i-dont-exist.txt'), false);
  });
});
