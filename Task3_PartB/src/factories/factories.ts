import { FoodProduct, TechProduct } from '../products/products';
import { FoodProductBuilder, TechProductBuilder } from '../builders/builders';

export interface IProductFactory<T> {
  create(type: string): T;
}

export class AppleFactory implements IProductFactory<FoodProduct> {
  create(type: string): FoodProduct {
    switch (type) {
      case 'Green Apple':
        return new FoodProductBuilder()
          .setName('Green Apple')
          .setPrice(1.1)
          .setCalories(48)
          .build();

      case 'Red Apple':
        return new FoodProductBuilder()
          .setName('Red Apple')
          .setPrice(1.3)
          .setCalories(52)
          .build();

      case 'Yellow Apple':
        return new FoodProductBuilder()
          .setName('Yellow Apple')
          .setPrice(1.5)
          .setCalories(50)
          .build();

      default:
        throw new Error(`type error: ${type}`);
    }
  }
}

export class TechProductFactory implements IProductFactory<TechProduct> {
  create(type: string): TechProduct {
    switch (type) {
      case 'Laptop':
        return new TechProductBuilder()
          .setName('Laptop')
          .setPrice(1000)
          .setWarranty(2)
          .build();

      case 'Fridge':
        return new TechProductBuilder()
          .setName('Samsung Fridge')
          .setPrice(500)
          .setVolume(300)
          .setHasFreezer(true)
          .setEnergyClass('A++')
          .build();

      case 'Smartphone':
        return new TechProductBuilder()
          .setName('Smartphone')
          .setPrice(700)
          .setWarranty(1)
          .build();

      default:
        throw new Error(`type error: ${type}`);
    }
  }
}
