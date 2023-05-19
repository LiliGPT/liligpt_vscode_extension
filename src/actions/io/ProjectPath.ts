/**
 * This is a lib to work with local paths.
 */

// apparently process.cwd() is the project root
export const projectDir = process.cwd();

export class ProjectPath {
  private baseDir: string;

  constructor(baseDir: string | null = null) {
    this.baseDir = baseDir || projectDir;
  }

  public static absolute(uri: string, baseDir?: string): string {
    const path = new ProjectPath();
    return path.absolute(uri, baseDir);
  }

  public absolute(uri: string, baseDir?: string): string {
    return `${baseDir || this.baseDir}/${uri}`;
  }
}
