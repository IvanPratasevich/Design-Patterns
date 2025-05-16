import { Oval } from '../entities/Oval';

export class OvalCalculator {
  calculateArea(oval: Oval): number {
    const [p1, p2] = oval.getPoints();
    const a = Math.abs(p2.x - p1.x) / 2;
    const b = Math.abs(p2.y - p1.y) / 2;
    return Math.PI * a * b;
  }

  calculatePerimeter(oval: Oval): number {
    const [p1, p2] = oval.getPoints();
    const a = Math.abs(p2.x - p1.x) / 2;
    const b = Math.abs(p2.y - p1.y) / 2;
    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  isValidOval(oval: Oval): boolean {
    const [p1, p2] = oval.getPoints();
    return !(p1.x === p2.x || p1.y === p2.y);
  }

  isCircle(oval: Oval): boolean {
    const [p1, p2] = oval.getPoints();
    const a = Math.abs(p2.x - p1.x);
    const b = Math.abs(p2.y - p1.y);
    return a === b;
  }

  crossOneAxis(oval: Oval): 'x' | 'y' | 'both' | 'none' {
    const [p1, p2] = oval.getPoints();
    const crossesX = (p1.y <= 0 && p2.y >= 0) || (p2.y <= 0 && p1.y >= 0);
    const crossesY = (p1.x <= 0 && p2.x >= 0) || (p2.x <= 0 && p1.x >= 0);

    if (crossesX && crossesY) return 'both';
    if (crossesX) return 'x';
    if (crossesY) return 'y';
    return 'none';
  }
}
