import { existsSync } from "fs";

export function fileExists(path: string): boolean {
  const projectPath = path;
  return existsSync(projectPath);
}
