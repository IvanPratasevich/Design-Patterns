import { Shape } from '../entities/Shape';

export interface Comparator {
  compare(a: Shape, b: Shape): number;
}

export class IdComparator implements Comparator {
  compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}

export class NameComparator implements Comparator {
  compare(a: Shape, b: Shape): number {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  }
}

export class FirstPointXComparator implements Comparator {
  compare(a: Shape, b: Shape): number {
    const pointA = a.getPoints()[0];
    const pointB = b.getPoints()[0];
    if (pointA.x < pointB.x) return -1;
    if (pointA.x > pointB.x) return 1;
    return 0;
  }
}

export class FirstPointYComparator implements Comparator {
  compare(a: Shape, b: Shape): number {
    const pointA = a.getPoints()[0];
    const pointB = b.getPoints()[0];
    if (pointA.y < pointB.y) return -1;
    if (pointA.y > pointB.y) return 1;
    return 0;
  }
}
