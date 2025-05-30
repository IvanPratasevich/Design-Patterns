import { Shape } from '../entities/Shape';
import { Oval } from '../entities/Oval';
import { Tetrahedron } from '../entities/Tetrahedron';
import { OvalCalculator } from '../services/OvalCalculator';
import { TetrahedronCalculator } from '../services/TetrahedronCalculator';

export class Warehouse {
  private static instance: Warehouse;

  private data: Array<{
    shapeId: string;
    area?: number;
    volume?: number;
    perimeter?: number;
  }> = [];

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public updateArea(shape: Shape): void {
    if (shape instanceof Oval) {
      const area = new OvalCalculator().calculateArea(shape);
      this.updateData(shape.id, 'area', area);
    }
  }

  public updateVolume(shape: Shape): void {
    if (shape instanceof Tetrahedron) {
      const volume = new TetrahedronCalculator().volume(shape);
      this.updateData(shape.id, 'volume', volume);
    }
  }

  public updatePerimeter(shape: Shape): void {
    if (shape instanceof Oval) {
      const perimeter = new OvalCalculator().calculatePerimeter(shape);
      this.updateData(shape.id, 'perimeter', perimeter);
    }
  }

  public getArea(shapeId: string): number | undefined {
    const item = this.data.find(item => item.shapeId === shapeId);
    return item?.area;
  }

  public getVolume(shapeId: string): number | undefined {
    const item = this.data.find(item => item.shapeId === shapeId);
    return item?.volume;
  }

  public getPerimeter(shapeId: string): number | undefined {
    const item = this.data.find(item => item.shapeId === shapeId);
    return item?.perimeter;
  }

  private updateData(
    shapeId: string,
    key: 'area' | 'volume' | 'perimeter',
    value: number,
  ): void {
    const index = this.data.findIndex(item => item.shapeId === shapeId);
    if (index !== -1) {
      this.data[index][key] = value;
    } else {
      this.data.push({ shapeId, [key]: value });
    }
  }
}
