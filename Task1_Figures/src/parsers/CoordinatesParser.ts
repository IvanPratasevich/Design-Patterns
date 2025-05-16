import { Point2D } from '../entities/Point2D';
import { Point3D } from '../entities/Point3D';
import { REGEXP } from '../constants/constants';
import {
  InvalidCoordinatesError,
  InvalidNumberError,
} from '../errors/CustomErrors';

export class CoordinateParser {
  static parse2DArray(coords: string[]): Point2D[] {
    return this.parse(coords, 2);
  }

  static parse3DArray(coords: string[]): Point3D[] {
    return this.parse(coords, 3) as Point3D[];
  }

  private static parse(
    coords: string[],
    dimension: number,
  ): (Point2D | Point3D)[] {
    return coords.map(coordStr => {
      const parts = coordStr.trim().split(REGEXP);
      if (parts.length !== dimension) {
        throw new InvalidCoordinatesError(dimension, coordStr);
      }
      const nums = parts.map(Number);
      for (const n of nums) {
        if (!isFinite(n)) {
          throw new InvalidNumberError(dimension, coordStr);
        }
      }

      switch (dimension) {
        case 2:
          return new Point2D(nums[0], nums[1]);
        case 3:
          return new Point3D(nums[0], nums[1], nums[2]);
        default:
          throw new InvalidCoordinatesError(dimension, coordStr);
      }
    });
  }
}
