import fs from 'fs';
import path from 'path';

export function listScriptsByRegex(regex: RegExp, directory: string): { [key: string]: string } {
  const packageJsonPath = path.join(directory, 'package.json');

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    const matchedScripts: { [key: string]: string } = {};

    for (const scriptName in packageJson.scripts) {
      if (regex.test(scriptName)) {
        matchedScripts[scriptName] = packageJson.scripts[scriptName];
      }
    }

    return matchedScripts;
  } catch (error: any) {
    throw new Error(`Failed to read package.json: ${error.message}`);
  }
}
