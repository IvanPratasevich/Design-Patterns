import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Point2D } from '../entities/Point2D';
import { Point3D } from '../entities/Point3D';

export class InputDataValidator {
  static validatePoints(name: string, points: (Point2D | Point3D)[]): boolean {
    switch (name) {
      case OVAL:
        return points.length === 2;
      case TETRAHEDRON:
        return points.length === 4;
      default:
        return false;
    }
  }
}
