import { z } from "zod";
import { listFilesByRegex } from "../io/listFilesByRegex.action";
import { listScriptsByRegex } from "../packageJson/listScriptsByRegex.action";

// match: *.service.ts
const allowedTestFiles = z.string().regex(/.*\.service\.ts/);

export function findTestFileLocation(file: string, directory = ''): string[] {
  // ensure file is a service file
  const match = allowedTestFiles.safeParse(file);
  if (!match.success) {
    throw new Error(`File ${file} is not a service file`);
  }

  // todo: get config file location
  // todo: get regex for test files
  // todo: *find files from that regex, ensure all of them looks similar
  // todo: *create a new path based on that

  // search for other service files
  const files = listFilesByRegex(/.*\.service\.ts/, directory);
  return files;
}