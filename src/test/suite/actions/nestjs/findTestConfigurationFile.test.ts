import * as assert from 'assert';
import { findTestConfigurationFile } from '../../../../actions/nestjs/findTestConfigurationFile';
import { ProjectPath } from '../../../../actions/io/ProjectPath';
import { testConstants } from '../constants';

describe('actions/nestjs/findTestConfigurationFile.ts', () => {
  // todo: validate error messages
  it('should throw error if the path doesnt have a package.json', () => {
    assert.throws(() => findTestConfigurationFile(ProjectPath.absolute('src')));
  });

  it('should throw error if projectDir doesnt contain a nestjs project', () => {
    assert.throws(() => findTestConfigurationFile(ProjectPath.absolute('')));
  });

  it('should return the path to the test configuration file - valid nestjs project', () => {
    assert.equal(
      findTestConfigurationFile(ProjectPath.absolute(testConstants.nestjsDir1)),
      ProjectPath.absolute('jest.config.ts', testConstants.nestjsDir1)
    );
  });
});
