import * as assert from 'assert';
import { readFile } from '../../../../actions/io/readFile.action';
import * as sinon from 'sinon';

const fs = require('fs');

describe('actions/io/readFile.action.ts', () => {
  it('return existing file', () => {
    const mockContent = 'test file content';
    sinon.stub(fs, 'readFileSync').returns(mockContent);
    const content = readFile('testfile');
    assert.equal(content, mockContent);
    sinon.restore();
  });

  it('throw error if file does not exist', () => {
    sinon.stub(fs, 'readFileSync').throws('ENOENT');
    assert.throws(() => readFile('testfile'), Error);
    sinon.restore();
  });
});
