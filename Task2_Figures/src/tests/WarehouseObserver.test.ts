import { Tetrahedron } from '../entities/Tetrahedron';
import { WarehouseObserver } from '../observers/WarehouseObserver';
import { Point2D } from '../entities/Point2D';
import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Oval } from '../entities/Oval';
import { Warehouse } from '../warehouse/Warehouse';
import { Point3D } from '../entities/Point3D';

describe('WarehouseObserver', () => {
  let observer: WarehouseObserver;
  let warehouse: Warehouse;
  let oval: Oval;
  let tetrahedron: Tetrahedron;

  beforeEach(() => {
    observer = new WarehouseObserver();
    warehouse = Warehouse.getInstance();
    oval = new Oval('oval-1', OVAL, [new Point2D(0, 0), new Point2D(4, 6)]);
    tetrahedron = new Tetrahedron('tetra-1', TETRAHEDRON, [
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1),
    ]);
  });

  it('should update warehouse when oval is updated', () => {
    oval.subscribe(observer);

    expect(warehouse.getArea('oval-1')).toBeUndefined();
    expect(warehouse.getPerimeter('oval-1')).toBeUndefined();

    oval.notifyObserver();

    expect(warehouse.getArea('oval-1')).toBeDefined();
    expect(warehouse.getPerimeter('oval-1')).toBeDefined();
  });

  it('should call observer.update() when shape notifies', () => {
    const spy = jest.spyOn(observer, 'update');
    oval.subscribe(observer);

    oval.notifyObserver();

    expect(spy).toHaveBeenCalledWith(oval);
  });

  it('should not call observer.update() after unsubscribe', () => {
    const spy = jest.spyOn(observer, 'update');
    oval.subscribe(observer);
    oval.unsubscribe();

    oval.notifyObserver();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should update warehouse when tetrahedron is updated', () => {
    tetrahedron.subscribe(observer);

    expect(warehouse.getVolume('tetra-1')).toBeUndefined();

    tetrahedron.notifyObserver();

    expect(warehouse.getVolume('tetra-1')).toBeDefined();
  });

  it('should update warehouse when shape points are changed', () => {
    oval.subscribe(observer);

    oval.notifyObserver();
    const initialArea = warehouse.getArea('oval-1');

    oval.setPoints([new Point2D(0, 0), new Point2D(8, 12)]);

    const newArea = warehouse.getArea('oval-1');
    expect(newArea).not.toEqual(initialArea);
  });

  it('should not update warehouse after unsubscribe', () => {
    oval.subscribe(observer);

    oval.notifyObserver();
    const initialArea = warehouse.getArea('oval-1');

    oval.unsubscribe();

    oval.setPoints([new Point2D(0, 0), new Point2D(8, 12)]);

    oval.notifyObserver();
    const newArea = warehouse.getArea('oval-1');
    expect(newArea).toEqual(initialArea);
  });
});
