import fs from 'fs';
import path from 'path';

interface DependencyDetails {
  value: string;
  isDev: boolean;
}

function getDependencyValue(name: string, key: string, packageJson: any): string {
  if (Object.keys(packageJson[key]).indexOf(name) > -1) {
    return packageJson[key][name];
  }
  return '';
}

export function getDependencyDetails(name: string, directory: string): DependencyDetails | null {
  const packageJsonPath = path.join(directory, 'package.json');

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    const prodValue = getDependencyValue(name, 'dependencies', packageJson);
    const devValue = getDependencyValue(name, 'devDependencies', packageJson);
    const isDev = devValue !== '';
    const finalValue = prodValue || devValue;

    if (!finalValue) {
      return null;
    }

    return {
      isDev,
      value: finalValue,
    };
  } catch (error: any) {
    throw new Error(`Failed to read package.json: ${error.message}`);
  }

  return null;
}
