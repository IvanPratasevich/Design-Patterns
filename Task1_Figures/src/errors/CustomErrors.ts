export class FileReadError extends Error {
  constructor(filename: string, originalError?: Error) {
    super(`Failed to read file: ${filename}`);
    this.name = 'FileReadError';
  }
}

export class InvalidCoordinatesError extends Error {
  constructor(dimension: number, coordStr: string) {
    super(`Invalid ${dimension}D point format: "${coordStr}"`);
    this.name = 'InvalidCoordinatesError';
  }
}

export class InvalidNumberError extends Error {
  constructor(dimension: number, coordStr: string) {
    super(`Invalid number in ${dimension}D point: "${coordStr}"`);
    this.name = 'InvalidNumberError';
  }
}

export class InvalidShapePointsError extends Error {
  constructor(shapeName: string) {
    super(`Invalid points for creating a ${shapeName}`);
    this.name = 'InvalidShapePointsError';
  }
}

export class LineParseError extends Error {
  constructor(message = 'Empty or invalid line format') {
    super(message);
    this.name = 'LineParseError';
  }
}
