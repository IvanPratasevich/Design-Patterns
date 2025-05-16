// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { ShapeFactory } from './ShapeFactory';
import { Oval } from '../entities/Oval';
import { Point2D } from '../entities/Point2D';
import { OVAL } from '../constants/constants';
import { InputDataValidator } from '../validators/InputDataValidator';
import { InvalidShapePointsError } from '../errors/CustomErrors';

export class OvalFactory extends ShapeFactory {
  create(points: Point2D[]): Oval {
    if (!InputDataValidator.validatePoints(OVAL, points)) {
      throw new InvalidShapePointsError('oval');
    }

    const id = uuidv4();
    return new Oval(id, OVAL, points);
  }
}
