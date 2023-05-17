import { z } from "zod";
import { listFilesByRegex } from "../io/listFilesByRegex.action";

// match: *.service.ts
const allowedTestFiles = z.string().regex(/.*\.service\.ts/);

export function findTestFileLocation(file: string, directory = ''): string[] {
  // ensure file is a service file
  const match = allowedTestFiles.safeParse(file);
  if (!match.success) {
    throw new Error(`File ${file} is not a service file`);
  }

  // search for other service files
  const files = listFilesByRegex(/.*\.service\.ts/, directory);
  return files;
}