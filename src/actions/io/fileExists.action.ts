import { existsSync } from "fs";
import { ProjectPath } from "./ProjectPath";

export function fileExists(path: string): boolean {
  const projectPath = ProjectPath.absolute(path);
  return existsSync(projectPath);
}
