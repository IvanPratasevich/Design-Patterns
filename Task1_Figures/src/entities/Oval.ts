import { Point2D } from './Point2D';
import { Shape } from './Shape';

export class Oval extends Shape {
  constructor(
    public id: string,
    public name: string,
    public points: Point2D[],
  ) {
    super(id);
  }

  getPoints(): Point2D[] {
    return this.points;
  }
}
