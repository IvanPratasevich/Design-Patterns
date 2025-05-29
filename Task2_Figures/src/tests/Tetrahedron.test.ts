import { TetrahedronCalculator } from '../services/TetrahedronCalculator';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Point3D } from '../entities/Point3D';

describe('Tetrahedron entity', () => {
  test('should create Tetrahedron instance and return points', () => {
    const id = 'tetra1';
    const name = 'Test Tetrahedron';
    const points = [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ];

    const tetra = new Tetrahedron(id, name, points);

    expect(tetra).toBeInstanceOf(Tetrahedron);
    expect(tetra.id).toBe(id);
    expect(tetra.name).toBe(name);
    expect(tetra.getPoints()).toEqual(points);
  });

  test('should have exactly 4 points', () => {
    const points = [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ];

    const tetra = new Tetrahedron('id2', 'Another Tetra', points);

    expect(tetra.getPoints().length).toBe(4);
  });
});

describe('TetrahedronCalculator', () => {
  let calc: TetrahedronCalculator;

  beforeEach(() => {
    calc = new TetrahedronCalculator();
  });

  test('volume and surfaceArea compute correctly', () => {
    const A = new Point3D(0, 0, 0);
    const B = new Point3D(1, 0, 0);
    const C = new Point3D(0.5, Math.sqrt(3) / 2, 0);
    const D = new Point3D(0.5, Math.sqrt(3) / 6, Math.sqrt(6) / 3);
    const tetra = new Tetrahedron('1', 'Regular Tetra', [A, B, C, D]);

    const volume = calc.volume(tetra);
    const surface = calc.surfaceArea(tetra);

    expect(volume).toBeCloseTo(0.11785, 4);
    expect(surface).toBeCloseTo(1.732, 2);
  });

  test('isValidTetrahedron returns false for flat tetrahedron', () => {
    const A = new Point3D(0, 0, 0);
    const B = new Point3D(1, 0, 0);
    const C = new Point3D(0, 1, 0);
    const D = new Point3D(1, 1, 0);
    const flat = new Tetrahedron('2', 'Flat', [A, B, C, D]);

    const isValid = calc.isValidTetrahedron(flat);

    expect(isValid).toBe(false);
    expect(calc.volume(flat)).toBe(0);
  });

  test('isBaseOnAnyCoordinatePlane detects base correctly', () => {
    const onXY = new Tetrahedron('3', 'OnXY', [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ]);
    const onYZ = new Tetrahedron('4', 'OnYZ', [
      new Point3D(0, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
      new Point3D(1, 1, 1),
    ]);
    const onXZ = new Tetrahedron('5', 'OnXZ', [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 0, 1),
      new Point3D(1, 1, 1),
    ]);
    const none = new Tetrahedron('6', 'None', [
      new Point3D(1, 1, 1),
      new Point3D(2, 2, 2),
      new Point3D(3, 3, 3),
      new Point3D(4, 4, 4),
    ]);

    const baseXY = calc.isBaseOnAnyCoordinatePlane(onXY);
    const baseYZ = calc.isBaseOnAnyCoordinatePlane(onYZ);
    const baseXZ = calc.isBaseOnAnyCoordinatePlane(onXZ);
    const baseNone = calc.isBaseOnAnyCoordinatePlane(none);

    expect(baseXY).toBe(true);
    expect(baseYZ).toBe(true);
    expect(baseXZ).toBe(true);
    expect(baseNone).toBe(false);
  });
});
