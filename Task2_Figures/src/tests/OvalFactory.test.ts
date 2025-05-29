import { Point2D } from '../entities/Point2D';
import { OvalFactory } from '../factories/OvalFactory';

describe('OvalFactory', () => {
  const factory = new OvalFactory();

  test('creates Oval with valid points', () => {
    const points = [new Point2D(0, 0), new Point2D(2, 2)];
    const oval = factory.create(points);
    expect(oval).toBeDefined();
    expect(oval.points).toEqual(points);
    expect(typeof oval.id).toBe('string');
  });

  test('throws InvalidShapePointsError with wrong number of points', () => {
    const points = [new Point2D(1, 1)];
    expect(() => factory.create(points)).toThrow(
      'Invalid points for creating a oval',
    );
  });
});
