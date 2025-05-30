import { Point3D } from '../entities/Point3D';
import { Tetrahedron } from '../entities/Tetrahedron';
import { OVAL, TETRAHEDRON } from '../constants/constants';
import {
  FirstPointXComparator,
  FirstPointYComparator,
  IdComparator,
  NameComparator,
} from '../comparators/Comparators';
import { Oval } from '../entities/Oval';
import { Point2D } from '../entities/Point2D';

describe('Comparators', () => {
  let oval1: Oval;
  let oval2: Oval;
  let tetrahedron: Tetrahedron;

  beforeEach(() => {
    oval1 = new Oval('oval-1', OVAL, [new Point2D(1, 2), new Point2D(3, 4)]);
    oval2 = new Oval('oval-2', OVAL, [new Point2D(-1, -2), new Point2D(3, 4)]);
    tetrahedron = new Tetrahedron('tetra-1', TETRAHEDRON, [
      new Point3D(5, 6, 7),
      new Point3D(8, 9, 10),
      new Point3D(11, 12, 13),
      new Point3D(14, 15, 16),
    ]);
  });

  describe('IdComparator', () => {
    it('should compare shapes by ID', () => {
      const comparator = new IdComparator();
      expect(comparator.compare(oval1, oval2)).toBeLessThan(0);
      expect(comparator.compare(oval2, oval1)).toBeGreaterThan(0);
      expect(comparator.compare(oval1, oval1)).toBe(0);
    });
  });

  describe('NameComparator', () => {
    it('should compare shapes by name', () => {
      const comparator = new NameComparator();
      expect(comparator.compare(oval1, tetrahedron)).toBeLessThan(0);
      expect(comparator.compare(tetrahedron, oval1)).toBeGreaterThan(0);
      expect(comparator.compare(oval1, oval2)).toBe(0);
    });

    it('should handle undefined names', () => {
      const comparator = new NameComparator();
      const shapeWithoutName = new Oval('no-name', undefined as any, [
        new Point2D(1, 2),
        new Point2D(3, 4),
      ]);
      expect(comparator.compare(shapeWithoutName, shapeWithoutName)).toBe(0);
    });
  });

  describe('FirstPointXComparator', () => {
    it('should compare shapes by first point X coordinate', () => {
      const comparator = new FirstPointXComparator();
      expect(comparator.compare(oval2, oval1)).toBeLessThan(0);
      expect(comparator.compare(oval1, oval2)).toBeGreaterThan(0);
      expect(comparator.compare(oval1, oval1)).toBe(0);
    });
  });

  describe('FirstPointYComparator', () => {
    it('should compare shapes by first point Y coordinate', () => {
      const comparator = new FirstPointYComparator();
      expect(comparator.compare(oval2, oval1)).toBeLessThan(0);
      expect(comparator.compare(oval1, oval2)).toBeGreaterThan(0);
      expect(comparator.compare(oval1, oval1)).toBe(0);
    });
  });
});
