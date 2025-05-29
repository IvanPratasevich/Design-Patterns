import { OvalCalculator } from '../services/OvalCalculator';
import { Oval } from '../entities/Oval';
import { Point2D } from '../entities/Point2D';

describe('Oval entity', () => {
  test('should create Oval instance and return points', () => {
    const id = 'abc123';
    const name = 'Test Oval';
    const points = [new Point2D(1, 2), new Point2D(3, 4)];

    const oval = new Oval(id, name, points);

    expect(oval).toBeInstanceOf(Oval);
    expect(oval.id).toBe(id);
    expect(oval.name).toBe(name);
    expect(oval.getPoints()).toEqual(points);
  });
});

describe('OvalCalculator', () => {
  let calc: OvalCalculator;

  beforeEach(() => {
    calc = new OvalCalculator();
  });

  test('calculateArea and calculatePerimeter for oval', () => {
    const p1 = new Point2D(0, 0);
    const p2 = new Point2D(4, 2);
    const oval = new Oval('1', 'Test Oval', [p1, p2]);

    const area = calc.calculateArea(oval);
    const perimeter = calc.calculatePerimeter(oval);

    expect(area).toBeCloseTo(Math.PI * 2 * 1, 5);
    expect(perimeter).toBeGreaterThan(0);
    expect(perimeter).toBeLessThan(20);
  });

  test('isValidOval returns false when points on same axis line', () => {
    const vertical = new Oval('2', 'Vertical', [
      new Point2D(1, 1),
      new Point2D(1, 5),
    ]);
    const horizontal = new Oval('3', 'Horizontal', [
      new Point2D(2, 3),
      new Point2D(5, 3),
    ]);

    const isValidVertical = calc.isValidOval(vertical);
    const isValidHorizontal = calc.isValidOval(horizontal);

    expect(isValidVertical).toBe(false);
    expect(isValidHorizontal).toBe(false);
  });

  test('isCircle returns true when width equals height', () => {
    const circle = new Oval('4', 'Circle', [
      new Point2D(0, 0),
      new Point2D(4, 4),
    ]);
    const notCircle = new Oval('5', 'Not Circle', [
      new Point2D(0, 0),
      new Point2D(5, 3),
    ]);

    const isCircle = calc.isCircle(circle);
    const isNotCircle = calc.isCircle(notCircle);

    expect(isCircle).toBe(true);
    expect(isNotCircle).toBe(false);
  });

  test('crossOneAxis returns correct result', () => {
    // given
    const both = new Oval('6', 'Both', [
      new Point2D(-1, -1),
      new Point2D(1, 1),
    ]);
    const onlyX = new Oval('7', 'Only X', [
      new Point2D(1, -1),
      new Point2D(2, 1),
    ]);
    const onlyY = new Oval('8', 'Only Y', [
      new Point2D(-1, 2),
      new Point2D(1, 3),
    ]);
    const none = new Oval('9', 'None', [new Point2D(2, 2), new Point2D(4, 4)]);

    const resultBoth = calc.crossOneAxis(both);
    const resultX = calc.crossOneAxis(onlyX);
    const resultY = calc.crossOneAxis(onlyY);
    const resultNone = calc.crossOneAxis(none);

    expect(resultBoth).toBe('both');
    expect(resultX).toBe('x');
    expect(resultY).toBe('y');
    expect(resultNone).toBe('none');
  });
});
