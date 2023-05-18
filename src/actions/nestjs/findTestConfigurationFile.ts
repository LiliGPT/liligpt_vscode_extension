import { testConstants } from "../../test/suite/actions/constants";
import { getDependencyDetails } from "../packageJson/getDependencyDetails";
import { listScriptsByRegex } from "../packageJson/listScriptsByRegex.action";

export function findTestConfigurationFile(filePath: string) {
  // check if we have dependency @nestjs/testing
  const dep = getDependencyDetails('@nestjs/testing', testConstants.nestjsDir1);
  return dep;

  // todo: find the test command in packageJson
  const packageJsonScriptValue = 'jest';

}
