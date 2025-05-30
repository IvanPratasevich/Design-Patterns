import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Point2D } from '../entities/Point2D';
import { Oval } from '../entities/Oval';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Point3D } from '../entities/Point3D';
import {
  ByIdSpecification,
  ByNameSpecification,
  InFirstQuadrantSpecification,
  WithDistanceRangeSpecification,
} from '../specifications/Specifications';

describe('Specifications and findWhere()', () => {
  let shapes: (Oval | Tetrahedron)[];

  beforeEach(() => {
    shapes = [
      new Oval('oval-1', 'Oval', [new Point2D(1, 2), new Point2D(3, 4)]), // Area ~ 12.56 (ellipse area)
      new Oval('oval-2', 'Oval', [new Point2D(-1, -2), new Point2D(3, 4)]), // Points not in first quadrant
      new Tetrahedron('tetra-1', 'Tetrahedron', [
        new Point3D(1, 1, 1),
        new Point3D(2, 1, 1),
        new Point3D(1, 2, 1),
        new Point3D(1, 1, 2),
      ]),
      new Tetrahedron('tetra-2', 'Tetrahedron', [
        new Point3D(-1, -1, -1),
        new Point3D(2, 1, 1),
        new Point3D(1, 2, 1),
        new Point3D(1, 1, 2),
      ]),
    ];
  });

  it('ByIdSpecification should find by id', () => {
    const spec = new ByIdSpecification('oval-1');
    const found = spec.findWhere(shapes);
    expect(found.length).toBe(1);
    expect(found[0].id).toBe('oval-1');
  });

  it('ByNameSpecification should find by name', () => {
    const spec = new ByNameSpecification('Oval');
    const found = spec.findWhere(shapes);
    expect(found.length).toBe(2);
    expect(found.every(s => s.name === 'Oval')).toBe(true);
  });

  it('InFirstQuadrantSpecification should find shapes fully in first quadrant', () => {
    const spec = new InFirstQuadrantSpecification();
    const found = spec.findWhere(shapes);
    expect(found.length).toBe(2);
    expect(found.find(s => s.id === 'oval-1')).toBeDefined();
    expect(found.find(s => s.id === 'tetra-1')).toBeDefined();
  });

  it('WithDistanceRangeSpecification should find shapes with points at certain distances', () => {
    const spec = new WithDistanceRangeSpecification(1.5, 3);
    const found = spec.findWhere(shapes);
    expect(found.length).toBeGreaterThan(0);
    expect(found.find(s => s.id === 'oval-1')).toBeDefined();
    expect(found.find(s => s.id === 'oval-2')).toBeDefined();
    expect(found.find(s => s.id === 'tetra-1')).toBeDefined();
  });
});
