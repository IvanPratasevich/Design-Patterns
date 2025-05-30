import { Subject } from '../observers/Subject';
import { Point3D } from './Point3D';
import { Point2D } from './Point2D';

export abstract class Shape extends Subject {
  protected constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {
    super();
  }

  abstract getPoints(): Point2D[] | Point3D[];
}
