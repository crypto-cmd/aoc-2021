import {readFile} from "fs/promises";

export async function readLines(filePath: string): Promise<string[]> {
  const data = await readFile(filePath, "utf8");
  return data.split("\n");
}

module.exports = {readLines, readFile};
