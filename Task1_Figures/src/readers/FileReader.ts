import fs from 'fs';
import path from 'path';
import { FileReadError } from '../errors/CustomErrors';

export class FileReader {
  static readFile(filename: string): string {
    const fullPath = path.resolve(__dirname, '../data', filename);
    try {
      return fs.readFileSync(fullPath, 'utf-8');
    } catch (e) {
      throw new FileReadError(filename, e as Error);
    }
  }
}
