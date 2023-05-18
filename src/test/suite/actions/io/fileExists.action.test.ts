import * as assert from 'assert';
import * as vscode from 'vscode';
import { fileExists } from '../../../../actions/io/fileExists.action';
import { ProjectPath } from '../../../../actions/io/ProjectPath';

describe('actions/io/fileExists.action.ts', () => {
  it('this test should exist', () => {
    assert.equal(fileExists(ProjectPath.absolute('src/test/suite/actions/io/fileExists.action.test.ts')), true);
  });

  it('invalid file should not exist', () => {
    assert.equal(fileExists('i-dont-exist.txt'), false);
  });
});
