import { Observer } from './Observer';
import { Shape } from '../entities/Shape';
import { Oval } from '../entities/Oval';
import { Tetrahedron } from '../entities/Tetrahedron';
import { OvalCalculator } from '../services/OvalCalculator';
import { TetrahedronCalculator } from '../services/TetrahedronCalculator';
import { Warehouse } from '../warehouse/Warehouse';

export class WarehouseObserver extends Observer {
  private warehouse = Warehouse.getInstance();

  public update(subject: Shape): void {
    if (subject instanceof Oval) {
      const calculator = new OvalCalculator();
      this.warehouse.updateArea(subject);
      this.warehouse.updatePerimeter(subject);
    } else if (subject instanceof Tetrahedron) {
      const calculator = new TetrahedronCalculator();
      this.warehouse.updateVolume(subject);
    }
  }
}
