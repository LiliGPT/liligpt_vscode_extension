import * as assert from 'assert';
import * as vscode from 'vscode';
import { ProjectPath, projectDir } from '../../../../actions/io/ProjectPath';

describe('actions/io/ProjectPath.ts', () => {
  it('Should convert path to absolute considering basePath', () => {
    const projectPath = new ProjectPath('/home/user');
    const absolutePath = projectPath.absolute('file.txt');
    assert.equal(absolutePath, '/home/user/file.txt');
  });

  it('Should convert path to absolute considering projectDir', () => {
    const projectPath = new ProjectPath();
    const absolutePath = projectPath.absolute('file.txt');
    assert.equal(absolutePath, `${projectDir}/file.txt`);
  });
});
