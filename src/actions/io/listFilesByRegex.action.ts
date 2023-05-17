import fs from 'fs';
import ignore, { Ignore } from 'ignore';
import path from 'path';

export function listFilesByRegex(regex: RegExp, directory: string): string[] {
  const files: string[] = [];
  const ignoreList: Ignore = ignore();

  function traverseDirectory(currentPath: string) {
    const items = fs.readdirSync(currentPath);

    items.forEach((item) => {
      const itemPath = path.join(currentPath, item);
      const relativePath = path.relative(directory, itemPath); // Get the relative path

      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverseDirectory(itemPath); // Recursively traverse subdirectories
      } else if (stats.isFile() && regex.test(item) && !ignoreList.ignores(relativePath)) {
        files.push(itemPath); // Add the file path if it matches the regex and is not ignored
      }
    });
  }

  const gitignorePath = path.join(directory, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ignoreList.add(gitignoreContent);
  }

  traverseDirectory(directory);
  return files;
}
