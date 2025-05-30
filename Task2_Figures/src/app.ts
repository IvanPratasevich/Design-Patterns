// import { OvalFactory } from './factories/OvalFactory';
// import { TetrahedronFactory } from './factories/TetrahedronFactory';
// import { OvalCalculator } from './services/OvalCalculator';
// import { TetrahedronCalculator } from './services/TetrahedronCalculator';
// import { logger } from './logger/logger';
// import { CoordinateParser } from './parsers/CoordinatesParser';
// import { FileReader } from './readers/FileReader';
// import { LineParser } from './parsers/LineParser';
// import { ShapeRepository } from './repositories/ShapeRepository';
// import { Point2D } from './entities/Point2D';
// import { Oval } from './entities/Oval';
// import {
//   ByIdSpecification,
//   ByNameSpecification,
//   InFirstQuadrantSpecification,
//   WithAreaRangeSpecification,
//   WithDistanceRangeSpecification,
// } from './specifications/Specifications';
// import { Point3D } from './entities/Point3D';
// import { Warehouse } from './warehouse/Warehouse';
//
// export class App {
//   public repository = new ShapeRepository();
//
//   run(inputFile: string) {
//     let data: string = FileReader.readFile(inputFile);
//     const lines: string[] = data.split('\n').map(line => line.trim());
//
//     for (const line of lines) {
//       if (line.trim() === '') continue;
//       try {
//         const { shapeType, coordsStr } = LineParser.parse(line, '*');
//
//         if (shapeType === 'oval') {
//           this.processOval(coordsStr);
//         } else if (shapeType === 'tetrahedron') {
//           this.processTetrahedron(coordsStr);
//         } else {
//           logger.warn(`Unknown shape type: ${shapeType}`);
//         }
//       } catch (e) {
//         if (e instanceof Error) {
//           logger.error(`Error line: ${line}  ___  ${e.message}`);
//         } else {
//           logger.error(`Error line: ${line}  ___  Unknown error`);
//         }
//       }
//     }
//   }
//
//   private processOval(coordsStr: string[]) {
//     const points = CoordinateParser.parse2DArray(coordsStr);
//     const oval = new OvalFactory().create(points);
//     const calc = new OvalCalculator();
//
//     this.repository.add(oval);
//
//     // logger.info(
//     //   `Oval "${oval.id}" ___ ` +
//     //     `Area: ${calc.calculateArea(oval).toFixed(2)}, ` +
//     //     `Is Circle: ${calc.isCircle(oval)}, ` +
//     //     `Intersects Only One Axis: ${calc.crossOneAxis(oval)}, ` +
//     //     `Is Valid Oval: ${calc.isValidOval(oval)}, ` +
//     //     `Perimeter: ${calc.calculatePerimeter(oval).toFixed(2)}`,
//     // );
//   }
//
//   private processTetrahedron(coordsStr: string[]) {
//     const points = CoordinateParser.parse3DArray(coordsStr);
//     const tetra = new TetrahedronFactory().create(points);
//     const calc = new TetrahedronCalculator();
//
//     this.repository.add(tetra);
//     // logger.info(
//     //   `Tetrahedron "${tetra.id}" ___ ` +
//     //     `Surface Area: ${calc.surfaceArea(tetra).toFixed(2)}, ` +
//     //     `Volume: ${calc.volume(tetra).toFixed(2)}, ` +
//     //     `Is Valid: ${calc.isValidTetrahedron(tetra)}, ` +
//     //     `Base on Coordinate Plane: ${calc.isBaseOnAnyCoordinatePlane(tetra)}`,
//     // );
//   }
// }
