import {
  FoodProductBuilder,
  FridgeProductBuilder,
  ProductBuilder,
  TechProductBuilder,
} from '../builders/builders';
import { Product } from '../products/products';

export interface ProductFactory {
  createProduct(builder: ProductBuilder): Product;
}

export class FoodProductFactory implements ProductFactory {
  createProduct(builder: FoodProductBuilder): Product {
    return builder.build();
  }
}

export class TechProductFactory implements ProductFactory {
  createProduct(builder: TechProductBuilder): Product {
    return builder.build();
  }
}

export class FridgeProductFactory implements ProductFactory {
  createProduct(builder: FridgeProductBuilder): Product {
    return builder.build();
  }
}
