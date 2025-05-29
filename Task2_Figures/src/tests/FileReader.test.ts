import fs from 'fs';
import path from 'path';
import { FileReader } from '../readers/FileReader';

jest.mock('fs');

describe('FileReader', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('reads file content successfully', () => {
    const content = 'some test data';
    (fs.readFileSync as jest.Mock).mockReturnValue(content);

    const result = FileReader.readFile('input.txt');
    expect(result).toBe(content);

    const expectedPath = path.resolve(__dirname, '../data', 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf-8');
  });

  test('throws FileReadError on read failure', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => FileReader.readFile('missing.txt')).toThrowError(
      expect.objectContaining({
        message: expect.stringContaining('Failed to read file'),
      }),
    );
  });
});
