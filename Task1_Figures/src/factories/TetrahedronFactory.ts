import { ShapeFactory } from './ShapeFactory';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Point3D } from '../entities/Point3D';
import { v4 as uuidv4 } from 'uuid';
import { TETRAHEDRON } from '../constants/constants';
import { InputDataValidator } from '../validators/InputDataValidator';
import { InvalidShapePointsError } from '../errors/CustomErrors';

export class TetrahedronFactory extends ShapeFactory {
  create(points: Point3D[]): Tetrahedron {
    if (!InputDataValidator.validatePoints(TETRAHEDRON, points)) {
      throw new InvalidShapePointsError('tetrahedron');
    }

    const id = uuidv4();
    return new Tetrahedron(id, TETRAHEDRON, points);
  }
}
