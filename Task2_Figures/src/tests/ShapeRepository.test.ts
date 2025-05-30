import { ShapeRepository } from '../repositories/ShapeRepository';
import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Point2D } from '../entities/Point2D';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Oval } from '../entities/Oval';
import { Point3D } from '../entities/Point3D';
import {
  ByIdSpecification,
  ByNameSpecification,
  InFirstQuadrantSpecification,
} from '../specifications/Specifications';
import {
  FirstPointXComparator,
  FirstPointYComparator,
  IdComparator,
  NameComparator,
} from '../comparators/Comparators';

describe('ShapeRepository', () => {
  let repository: ShapeRepository;
  let oval: Oval;
  let tetrahedron: Tetrahedron;

  beforeEach(() => {
    repository = new ShapeRepository();
    oval = new Oval('oval-1', OVAL, [new Point2D(1, 2), new Point2D(3, 4)]);
    tetrahedron = new Tetrahedron('tetra-1', TETRAHEDRON, [
      new Point3D(1, 2, 3),
      new Point3D(4, 5, 6),
      new Point3D(7, 8, 9),
      new Point3D(10, 11, 12),
    ]);
  });

  describe('add', () => {
    it('should add valid shapes to repository', () => {
      expect(repository.add(oval)).toBe(true);
      expect(repository.add(tetrahedron)).toBe(true);
      expect(repository.findAll().length).toBe(2);
    });

    it('should not add shapes with duplicate IDs', () => {
      repository.add(oval);
      const duplicateOval = new Oval('oval-1', OVAL, [
        new Point2D(5, 6),
        new Point2D(7, 8),
      ]);
      expect(repository.add(duplicateOval)).toBe(false);
      expect(repository.findAll().length).toBe(1);
    });

    it('should not add shapes with invalid names', () => {
      const invalidShape = new Oval('invalid-1', 'InvalidShape', [
        new Point2D(1, 2),
        new Point2D(3, 4),
      ]);
      expect(repository.add(invalidShape)).toBe(false);
      expect(repository.findAll().length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should find shape by ID', () => {
      repository.add(oval);
      repository.add(tetrahedron);
      const foundOval = repository.findOne('oval-1');
      expect(foundOval).toBe(oval);
    });

    it('should return null if shape not found', () => {
      repository.add(oval);
      const notFound = repository.findOne('non-existent-id');
      expect(notFound).toBeNull();
    });
  });

  describe('removeOne', () => {
    it('should remove shape by ID', () => {
      repository.add(oval);
      repository.add(tetrahedron);
      expect(repository.removeOne('oval-1')).toBe(true);
      expect(repository.findAll().length).toBe(1);
      expect(repository.findOne('oval-1')).toBeNull();
    });

    it('should return false if shape not found', () => {
      repository.add(oval);
      expect(repository.removeOne('non-existent-id')).toBe(false);
      expect(repository.findAll().length).toBe(1);
    });
  });

  describe('findWhere', () => {
    it('should find shapes by ID specification', () => {
      repository.add(oval);
      repository.add(tetrahedron);
      const spec = new ByIdSpecification('oval-1');
      const results = repository.findWhere(spec);
      expect(results.length).toBe(1);
      expect(results[0]).toBe(oval);
    });

    it('should find shapes by name specification', () => {
      repository.add(oval);
      repository.add(tetrahedron);
      const spec = new ByNameSpecification(OVAL);
      const results = repository.findWhere(spec);
      expect(results.length).toBe(1);
      expect(results[0]).toBe(oval);
    });

    it('should find shapes in first quadrant', () => {
      repository.add(oval);
      repository.add(tetrahedron);
      const spec = new InFirstQuadrantSpecification();
      const results = repository.findWhere(spec);
      expect(results.length).toBe(2);
    });
  });

  describe('sortBy', () => {
    it('should sort shapes by ID', () => {
      const oval2 = new Oval('oval-2', OVAL, [
        new Point2D(5, 6),
        new Point2D(7, 8),
      ]);
      repository.add(oval2);
      repository.add(oval);

      const sorted = repository.sortBy(new IdComparator());
      expect(sorted[0].id).toBe('oval-1');
      expect(sorted[1].id).toBe('oval-2');
    });

    it('should sort shapes by name', () => {
      const customOval = new Oval('custom-1', 'CustomOval', [
        new Point2D(5, 6),
        new Point2D(7, 8),
      ]);
      repository.add(oval);
      repository.add(tetrahedron);

      const sorted = repository.sortBy(new NameComparator());
      expect(sorted[0].name).toBe(OVAL);
      expect(sorted[1].name).toBe(TETRAHEDRON);
    });

    it('should sort shapes by first point X coordinate', () => {
      const oval2 = new Oval('oval-2', OVAL, [
        new Point2D(-1, 2),
        new Point2D(3, 4),
      ]);
      repository.add(oval);
      repository.add(oval2);

      const sorted = repository.sortBy(new FirstPointXComparator());
      expect(sorted[0].getPoints()[0].x).toBe(-1);
      expect(sorted[1].getPoints()[0].x).toBe(1);
    });

    it('should sort shapes by first point Y coordinate', () => {
      const oval2 = new Oval('oval-2', OVAL, [
        new Point2D(1, -2),
        new Point2D(3, 4),
      ]);
      repository.add(oval);
      repository.add(oval2);

      const sorted = repository.sortBy(new FirstPointYComparator());
      expect(sorted[0].getPoints()[0].y).toBe(-2);
      expect(sorted[1].getPoints()[0].y).toBe(2);
    });
  });
});
