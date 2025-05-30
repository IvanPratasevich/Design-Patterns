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

  public setPoints(newPoints: Point2D[]): void {
    this.points = newPoints;
    this.notifyObserver();
  }

  getPoints(): Point2D[] {
    return this.points;
  }
}
