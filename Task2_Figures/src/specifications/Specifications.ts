import { Oval } from '../entities/Oval';
import { Shape } from '../entities/Shape';
import { Tetrahedron } from '../entities/Tetrahedron';
import { OvalCalculator } from '../services/OvalCalculator';
import { TetrahedronCalculator } from '../services/TetrahedronCalculator';

export abstract class Specification {
  abstract isSatisfiedBy(item: Shape): boolean;

  findWhere(items: Shape[]): Shape[] {
    const result: Shape[] = [];
    for (const item of items) {
      if (this.isSatisfiedBy(item)) {
        result.push(item);
      }
    }
    return result;
  }
}

export class ByIdSpecification extends Specification {
  private readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  isSatisfiedBy(item: Shape): boolean {
    return item.id === this.id;
  }
}

export class ByNameSpecification extends Specification {
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  isSatisfiedBy(item: Shape): boolean {
    return item.name === this.name;
  }
}

export class InFirstQuadrantSpecification extends Specification {
  isSatisfiedBy(item: Shape): boolean {
    if (item instanceof Oval) {
      const [p1, p2] = item.getPoints();
      return p1.x > 0 && p1.y > 0 && p2.x > 0 && p2.y > 0;
    } else if (item instanceof Tetrahedron) {
      const points = item.getPoints();
      return points.every(p => p.x > 0 && p.y > 0 && p.z > 0);
    }
    return false;
  }
}

export class WithAreaRangeSpecification extends Specification {
  private readonly minArea: number;
  private readonly maxArea: number;

  constructor(minArea: number, maxArea: number) {
    super();
    this.minArea = minArea;
    this.maxArea = maxArea;
  }

  isSatisfiedBy(item: Shape): boolean {
    if (!(item instanceof Oval)) return false;
    const area = new OvalCalculator().calculateArea(item);
    return area >= this.minArea && area <= this.maxArea;
  }
}

export class WithVolumeRangeSpecification extends Specification {
  private readonly minVolume: number;
  private readonly maxVolume: number;

  constructor(minVolume: number, maxVolume: number) {
    super();
    this.minVolume = minVolume;
    this.maxVolume = maxVolume;
  }

  isSatisfiedBy(item: Shape): boolean {
    if (!(item instanceof Tetrahedron)) return false;
    const volume = new TetrahedronCalculator().volume(item);
    return volume >= this.minVolume && volume <= this.maxVolume;
  }
}

export class WithDistanceRangeSpecification extends Specification {
  private readonly minDistance: number;
  private readonly maxDistance: number;

  constructor(minDistance: number, maxDistance: number) {
    super();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }

  isSatisfiedBy(item: Shape): boolean {
    if (item instanceof Oval) {
      const [p1, p2] = item.getPoints();
      const d1 = Math.sqrt(p1.x ** 2 + p1.y ** 2);
      const d2 = Math.sqrt(p2.x ** 2 + p2.y ** 2);
      return (
        (d1 >= this.minDistance && d1 <= this.maxDistance) ||
        (d2 >= this.minDistance && d2 <= this.maxDistance)
      );
    } else if (item instanceof Tetrahedron) {
      const points = item.getPoints();
      for (const p of points) {
        const distance = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
        if (distance >= this.minDistance && distance <= this.maxDistance) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
}
