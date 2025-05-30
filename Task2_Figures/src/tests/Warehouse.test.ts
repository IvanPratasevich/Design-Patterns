import { Warehouse } from '../warehouse/Warehouse';
import { Oval } from '../entities/Oval';
import { Tetrahedron } from '../entities/Tetrahedron';
import { OvalCalculator } from '../services/OvalCalculator';
import { TetrahedronCalculator } from '../services/TetrahedronCalculator';
import { Point2D } from '../entities/Point2D';
import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Point3D } from '../entities/Point3D';

describe('Warehouse', () => {
  let warehouse: Warehouse;
  let oval: Oval;
  let tetrahedron: Tetrahedron;
  let ovalCalculator: OvalCalculator;
  let tetrahedronCalculator: TetrahedronCalculator;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    oval = new Oval('oval-1', OVAL, [new Point2D(0, 0), new Point2D(4, 6)]);
    tetrahedron = new Tetrahedron('tetra-1', TETRAHEDRON, [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ]);
    ovalCalculator = new OvalCalculator();
    tetrahedronCalculator = new TetrahedronCalculator();
  });

  it('should be a singleton', () => {
    const instance1 = Warehouse.getInstance();
    const instance2 = Warehouse.getInstance();
    expect(instance1).toBe(instance2);
  });

  describe('updateArea', () => {
    it('should update area for oval', () => {
      warehouse.updateArea(oval);
      const expectedArea = ovalCalculator.calculateArea(oval);
      expect(warehouse.getArea('oval-1')).toBeCloseTo(expectedArea);
    });

    it('should not update area for tetrahedron', () => {
      warehouse.updateArea(tetrahedron);
      expect(warehouse.getArea('tetra-1')).toBeUndefined();
    });
  });

  describe('updateVolume', () => {
    it('should update volume for tetrahedron', () => {
      warehouse.updateVolume(tetrahedron);
      const expectedVolume = tetrahedronCalculator.volume(tetrahedron);
      expect(warehouse.getVolume('tetra-1')).toBeCloseTo(expectedVolume);
    });

    it('should not update volume for oval', () => {
      warehouse.updateVolume(oval);
      expect(warehouse.getVolume('oval-1')).toBeUndefined();
    });
  });

  describe('updatePerimeter', () => {
    it('should update perimeter for oval', () => {
      warehouse.updatePerimeter(oval);
      const expectedPerimeter = ovalCalculator.calculatePerimeter(oval);
      expect(warehouse.getPerimeter('oval-1')).toBeCloseTo(expectedPerimeter);
    });

    it('should not update perimeter for tetrahedron', () => {
      warehouse.updatePerimeter(tetrahedron);
      expect(warehouse.getPerimeter('tetra-1')).toBeUndefined();
    });
  });

  describe('getArea, getVolume, getPerimeter', () => {
    it('should return undefined for non-existent shape', () => {
      expect(warehouse.getArea('non-existent')).toBeUndefined();
      expect(warehouse.getVolume('non-existent')).toBeUndefined();
      expect(warehouse.getPerimeter('non-existent')).toBeUndefined();
    });

    it('should update multiple properties for the same shape', () => {
      warehouse.updateArea(oval);
      warehouse.updatePerimeter(oval);

      const expectedArea = ovalCalculator.calculateArea(oval);
      const expectedPerimeter = ovalCalculator.calculatePerimeter(oval);

      expect(warehouse.getArea('oval-1')).toBeCloseTo(expectedArea);
      expect(warehouse.getPerimeter('oval-1')).toBeCloseTo(expectedPerimeter);
    });
  });
});
