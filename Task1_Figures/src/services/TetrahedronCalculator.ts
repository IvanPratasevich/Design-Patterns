import { Point3D } from '../entities/Point3D';
import { Tetrahedron } from '../entities/Tetrahedron';

export class TetrahedronCalculator {
  distance(a: Point3D, b: Point3D): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
  }

  triangleArea(a: Point3D, b: Point3D, c: Point3D): number {
    const ab = this.distance(a, b);
    const bc = this.distance(b, c);
    const ca = this.distance(c, a);
    const p = (ab + bc + ca) / 2;
    return Math.sqrt(p * (p - ab) * (p - bc) * (p - ca));
  }

  volume(tetra: Tetrahedron): number {
    const [A, B, C, D] = tetra.getPoints();

    const a1 = B.x - A.x;
    const a2 = B.y - A.y;
    const a3 = B.z - A.z;

    const b1 = C.x - A.x;
    const b2 = C.y - A.y;
    const b3 = C.z - A.z;

    const c1 = D.x - A.x;
    const c2 = D.y - A.y;
    const c3 = D.z - A.z;

    const det =
      a1 * (b2 * c3 - b3 * c2) -
      a2 * (b1 * c3 - b3 * c1) +
      a3 * (b1 * c2 - b2 * c1);

    return Math.abs(det) / 6;
  }

  surfaceArea(tetra: Tetrahedron): number {
    const [A, B, C, D] = tetra.getPoints();

    const areaABC = this.triangleArea(A, B, C);
    const areaABD = this.triangleArea(A, B, D);
    const areaACD = this.triangleArea(A, C, D);
    const areaBCD = this.triangleArea(B, C, D);

    return areaABC + areaABD + areaACD + areaBCD;
  }

  isValidTetrahedron(tetra: Tetrahedron): boolean {
    return this.volume(tetra) > 0;
  }

  isBaseOnAnyCoordinatePlane(tetra: Tetrahedron): boolean {
    const [A, B, C] = tetra.getPoints();
    const onXY = A.z === 0 && B.z === 0 && C.z === 0;
    const onYZ = A.x === 0 && B.x === 0 && C.x === 0;
    const onXZ = A.y === 0 && B.y === 0 && C.y === 0;
    return onXY || onYZ || onXZ;
  }
}
