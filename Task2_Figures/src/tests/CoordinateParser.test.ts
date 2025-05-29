import { Point2D } from '../entities/Point2D';
import { Point3D } from '../entities/Point3D';
import { CoordinateParser } from '../parsers/CoordinatesParser';

describe('CoordinateParser', () => {
  describe('parse2DArray', () => {
    it('should correctly parse valid 2D strings to Point2D objects', () => {
      const input = ['1 2', '-3 4.5'];

      const result = CoordinateParser.parse2DArray(input);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(new Point2D(1, 2));
      expect(result[1]).toEqual(new Point2D(-3, 4.5));
    });

    it('should throw InvalidCoordinatesError on wrong number of coordinates', () => {
      const input = ['1'];

      expect(() => CoordinateParser.parse2DArray(input)).toThrowError(
        expect.objectContaining({
          message: expect.stringContaining('Invalid 2D point format'),
        }),
      );
    });

    it('should throw InvalidNumberError on non-numeric values', () => {
      const input = ['1 a'];

      expect(() => CoordinateParser.parse2DArray(input)).toThrowError(
        expect.objectContaining({
          message: expect.stringContaining('Invalid number in 2D point'),
        }),
      );
    });
  });

  describe('parse3DArray', () => {
    it('should correctly parse valid 3D strings to Point3D objects', () => {
      const input = ['0 0 0', '1 0 0', '0 1 0', '0 0 1'];

      const result = CoordinateParser.parse3DArray(input);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual(new Point3D(0, 0, 0));
      expect(result[1]).toEqual(new Point3D(1, 0, 0));
      expect(result[2]).toEqual(new Point3D(0, 1, 0));
      expect(result[3]).toEqual(new Point3D(0, 0, 1));
    });

    it('should throw InvalidCoordinatesError if a string has too few values', () => {
      const input = ['1 2'];

      expect(() => CoordinateParser.parse3DArray(input)).toThrowError(
        expect.objectContaining({
          message: expect.stringContaining('Invalid 3D point format'),
        }),
      );
    });

    it('should throw InvalidNumberError if values are not numbers', () => {
      const input = ['1 b 3'];

      expect(() => CoordinateParser.parse3DArray(input)).toThrowError(
        expect.objectContaining({
          message: expect.stringContaining('Invalid number in 3D point'),
        }),
      );
    });
  });
});
