import { Shape } from '../entities/Shape';
import { OVAL, TETRAHEDRON } from '../constants/constants';
import { Specification } from '../specifications/Specifications';
import { WarehouseObserver } from '../observers/WarehouseObserver';
import { Comparator } from '../comparators/Comparators';

export class ShapeRepository {
  private shapes: Shape[] = [];
  private readonly observer: WarehouseObserver;

  constructor() {
    this.observer = new WarehouseObserver();
  }

  add(shape: Shape): boolean {
    if (!this.isValidShape(shape)) {
      return false;
    }

    for (const el of this.shapes) {
      if (shape.id === el.id) {
        return false;
      }
    }

    this.shapes.push(shape);
    shape.subscribe(this.observer);
    shape.notifyObserver();
    return true;
  }

  findOne(id: string): Shape | null {
    for (const shape of this.shapes) {
      if (id === shape.id) {
        return shape;
      }
    }
    return null;
  }

  removeOne(id: string): boolean {
    const index = this.findIndex(id);
    if (index !== -1) {
      const shape = this.shapes[index];
      shape.unsubscribe();
      this.shapes.splice(index, 1);
      return true;
    }
    return false;
  }

  findAll(): Shape[] {
    return this.shapes.slice();
  }

  private isValidShape(shape: Shape): boolean {
    const validShapeNames = [OVAL, TETRAHEDRON];
    const { name } = shape;
    for (const shapeName of validShapeNames) {
      if (name === shapeName) {
        return true;
      }
    }
    return false;
  }

  findIndex(id: string): number {
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  findWhere(spec: Specification): Shape[] {
    return spec.findWhere(this.shapes);
  }

  sortBy(comparator: Comparator): Shape[] {
    return this.shapes.slice().sort((a, b) => comparator.compare(a, b));
  }
}
