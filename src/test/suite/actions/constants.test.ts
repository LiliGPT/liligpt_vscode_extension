import * as assert from 'assert';
import * as path from 'path';
import { fileExists } from '../../../actions/io/fileExists.action';
import { testConstants } from './constants';
import { getDependencyDetails } from '../../../actions/packageJson/getDependencyDetails';

function isValidNestjsProject(directory: string) {
  // package.json exists
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fileExists(packageJsonPath)) {
    throw new Error(`package.json not found in ${directory}`);
  }

  // tsconfig.json exists
  const tsconfigJsonPath = path.join(directory, 'tsconfig.json');
  if (!fileExists(tsconfigJsonPath)) {
    throw new Error(`tsconfig.json not found in ${directory}`);
  }

  // src/main.ts exists
  const mainTsPath = path.join(directory, 'src', 'main.ts');
  if (!fileExists(mainTsPath)) {
    throw new Error(`src/main.ts not found in ${directory}`);
  }

  // nestjs dependency exists
  if (!getDependencyDetails('@nestjs/core', directory)) {
    throw new Error(`@nestjs/core dependency not found in ${directory}`);
  }

  return true;
}

describe('actions/constants.ts', () => {
  it('nestjsDir1 is a valid nestjs project', () => {
    assert.ok(isValidNestjsProject(testConstants.nestjsDir1));
  });

  it('projectDir is NOT a valid nestjs project', () => {
    // because it's an extension
    assert.throws(() => isValidNestjsProject(testConstants.projectDir));
  });
});
