import { existsSync, readFileSync } from 'fs';
import { dirname } from 'path';

const rootpath = dirname(dirname(dirname(__filename)));

/**
 * Returns absolute path to file or directory.
 * 
 * @param path path to file or directory
 * @param errorString error string to throw if path does not exist
 * @returns absolute path to file or directory
 */
export function abspath(path: string, errorString?: string): string {
  const newpath = `${rootpath}/${path}`;
  if (errorString) {
    if (!existsSync(newpath)) {
      throw new Error(errorString);
    }
  }
  return newpath;
}

/**
 * Returns true if all paths exist, false otherwise.
 * If errorString is provided, it will be thrown if any path does not exist.
 * If errorString is not provided, it will return false if any path does not exist.
 * 
 * @param paths list of paths to files or directories
 */
export function exists(paths: string[], errorString?: string): boolean {
  for (let path of paths) {
    if (!existsSync(path)) {
      if (errorString) {
        throw new Error(errorString);
      }
      return false;
    }
  }
  return true;
}

/**
 * Read a file as string
 * 
 * @param path path to file
 * @param errorString error string to throw if path does not exist
 * @returns file contents as string
 * @throws error if path does not exist
 */
export function readAsString(path: string, errorString?: string): string {
  const filepath = abspath(path, errorString);
  const read = readFileSync(filepath, { encoding: 'utf8' });
  return read.toString();
}