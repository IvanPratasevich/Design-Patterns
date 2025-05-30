import { Point3D } from './Point3D';
import { Shape } from './Shape';

export class Tetrahedron extends Shape {
  constructor(
    public id: string,
    public name: string,
    public points: Point3D[],
  ) {
    super(id);
  }

  getPoints(): Point3D[] {
    return this.points;
  }

  public setPoints(newPoints: Point3D[]): void {
    this.points = newPoints;
    this.notifyObserver();
  }
}
