import { testConstants } from "../../test/suite/actions/constants";
import { getDependencyDetails } from "../packageJson/getDependencyDetails";
import { listScriptsByRegex } from "../packageJson/listScriptsByRegex.action";
import { fileExists } from "../io/fileExists.action";
import { ProjectPath } from "../io/ProjectPath";

function getDefaultConfigFilePath(projectDir: string): string {
  // todo: create a regex to match "jest.config.*" and
  //       if we have more than one, throw an error
  const defaultConfigFile = ProjectPath.absolute('jest.config.ts', projectDir);
  if (fileExists(defaultConfigFile)) {
    return defaultConfigFile;
  }
  return '';
}

export function findTestConfigurationFile(projectDir: string) {
  // check if we have dependency @nestjs/testing
  const dep = getDependencyDetails('@nestjs/testing', testConstants.nestjsDir1);
  if (!dep) {
    throw new Error('Missing dependency @nestjs/testing');
  }

  // check if we have a test script
  const scripts = listScriptsByRegex(/test/, testConstants.nestjsDir1);
  const scriptValue = scripts['test'];
  if (!scriptValue) {
    // todo: create a way to choose which test command to run
    throw new Error('Missing test script');
  }

  // -- check if we have a valid test script
  // it should contain "jest"
  if (scriptValue.indexOf('jest') === -1) {
    throw new Error('Missing jest config file');
  }

  // -- let's find the config file location
  // does it specify a config file?
  if (scriptValue.indexOf('--config') > -1) {
    // get the config file location
    const configStartIndex = scriptValue.indexOf('--config');
    const foundConfigFile = scriptValue[configStartIndex + 1].split(' ')[0];
    // if a config file is set, use it
    if (foundConfigFile) {
      const finalConfigFile = ProjectPath.absolute(foundConfigFile, projectDir);
      if (fileExists(finalConfigFile)) {
        return finalConfigFile;
      }
      throw new Error(`Config file ${finalConfigFile} does not exist`);
    }
    // throw new Error(`Config file ${defaultConfigFile} does not exist`);
  }
  // -- use default config file
  const defaultConfigFile = getDefaultConfigFilePath(projectDir);
  if (defaultConfigFile) {
    return defaultConfigFile;
  }
  throw new Error(`Config file ${defaultConfigFile} does not exist`);
}
