import { LineParseError } from '../errors/CustomErrors';

export class LineParser {
  static parse(
    line: string,
    separator: string,
  ): {
    shapeType: string;
    coordsStr: string[];
  } {
    const parts = line.split(separator).map(s => s.trim());
    const shapeType = parts[0];
    if (parts.some(el => el.length === 0)) {
      throw new LineParseError('Empty coordinates');
    }

    if (shapeType.length === 0) {
      throw new LineParseError();
    }
    const coordsStr = parts.slice(1);
    return { shapeType, coordsStr };
  }
}
