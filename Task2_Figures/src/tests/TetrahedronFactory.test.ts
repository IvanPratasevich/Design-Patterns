import { Point3D } from '../entities/Point3D';
import { TetrahedronFactory } from '../factories/TetrahedronFactory';

describe('TetrahedronFactory', () => {
  const factory = new TetrahedronFactory();

  test('creates Tetrahedron with valid points', () => {
    const points = [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ];
    const tetra = factory.create(points);
    expect(tetra).toBeDefined();
    expect(tetra.points).toEqual(points);
  });

  test('throws error when points are random', () => {
    const points = [new Point3D(1, NaN, NaN), new Point3D(1, NaN, NaN)];
    expect(() => factory.create(points)).toThrow(
      'Invalid points for creating a tetrahedron',
    );
  });
});
