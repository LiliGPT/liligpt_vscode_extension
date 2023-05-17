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

  public static absolute(uri: string): string {
    const path = new ProjectPath();
    return path.absolute(uri);
  }

  public absolute(uri: string): string {
    return `${this.baseDir}/${uri}`;
  }
}
