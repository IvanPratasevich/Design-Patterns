import { Shape } from '../entities/Shape';
import { Point2D } from '../entities/Point2D';
import { Point3D } from '../entities/Point3D';

export abstract class ShapeFactory {
  abstract create(points: Point2D[] | Point3D[]): Shape;
}
