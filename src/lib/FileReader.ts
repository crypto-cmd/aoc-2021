import fs from 'fs';

export class FileReader {
  public content: string;
  constructor( path: string) {
    this.content = fs.readFileSync(path, "utf8");
  }
  readLines(): string[] {
    return this.content.split("\n");
  }
  read(): string {
    return this.content;
  }

}
