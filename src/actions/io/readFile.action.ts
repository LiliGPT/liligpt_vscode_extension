import { readFileSync } from "fs";
import { ProjectPath } from "./ProjectPath";

export function readFile(uri: string): string {
  const path = ProjectPath.absolute(uri);
  return readFileSync(path).toString();
}
