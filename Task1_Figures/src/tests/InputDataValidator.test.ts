import { InputDataValidator } from '../validators/InputDataValidator';
import { Point2D } from '../entities/Point2D';
import { Point3D } from '../entities/Point3D';

describe('InputDataValidator', () => {
  test('validates correct number of Oval points', () => {
    const valid = [new Point2D(0, 0), new Point2D(1, 1)];
    console.log(valid.length);
    expect(InputDataValidator.validatePoints('Oval', valid)).toBe(true);
  });

  test('validates correct number of Tetrahedron points', () => {
    const valid = [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ];
    expect(InputDataValidator.validatePoints('Tetrahedron', valid)).toBe(true);
  });

  test('returns false for invalid shape name', () => {
    const points = [new Point2D(0, 0)];
    expect(InputDataValidator.validatePoints('Triangle', points)).toBe(false);
  });
});
