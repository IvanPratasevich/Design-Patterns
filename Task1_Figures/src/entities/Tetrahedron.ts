import { Point3D } from './Point3D';
import { Shape } from './Shape';

export class Tetrahedron extends Shape {
  constructor(
    public id: string,
    public name: string,
    public points: Point3D[], // 4 points
  ) {
    super(id);
  }

  getPoints(): Point3D[] {
    return this.points;
  }
}
