import { Product } from './products/products';

import {
  ProductSorter,
  SortByName,
  SortByPrice,
} from './strategies/strategies';

import {
  FoodProductBuilder,
  FridgeProductBuilder,
  TechProductBuilder,
} from './builders/builders';

import {
  FoodProductFactory,
  FridgeProductFactory,
  TechProductFactory,
} from './factories/factories';

const foodFactory = new FoodProductFactory();
const techFactory = new TechProductFactory();
const fridgeFactory = new FridgeProductFactory();

const foodBuilder = new FoodProductBuilder()
  .setName('Apple')
  .setPrice(1)
  .setCalories(52);
const techBuilder = new TechProductBuilder()
  .setName('Laptop')
  .setPrice(1000)
  .setWarranty(2);

const fridgeBuilder = new FridgeProductBuilder()
  .setName('Samsung Fridge')
  .setPrice(500)
  .setVolume(300)
  .setHasFreezer(true)
  .setEnergyClass('A++');

const apple = foodFactory.createProduct(foodBuilder);
const laptop = techFactory.createProduct(techBuilder);
const fridge = fridgeFactory.createProduct(fridgeBuilder);

const products: Product[] = [laptop, apple, fridge];

const sorter = new ProductSorter(new SortByName());
console.log('sorted by name:');
sorter.sort(products).forEach(p => console.log(p.getInfo()));

sorter.setStrategy(new SortByPrice());
console.log('\nsorted by price:');
sorter.sort(products).forEach(p => console.log(p.getInfo()));
