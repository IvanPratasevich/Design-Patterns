import { Product } from './products/products';
import {
  ProductSorter,
  SortByName,
  SortByPrice,
} from './strategies/strategies';
import { AppleFactory, TechProductFactory } from './factories/factories';

const appleFactory = new AppleFactory();
const techFactory = new TechProductFactory();

const greenApple = appleFactory.create('Green Apple');
const redApple = appleFactory.create('Red Apple');
const orangeApple = appleFactory.create('Yellow Apple');

const laptop = techFactory.create('Laptop');
const fridge = techFactory.create('Fridge');
const smartphone = techFactory.create('Smartphone');

const products: Product[] = [
  laptop,
  greenApple,
  fridge,
  redApple,
  orangeApple,
  smartphone,
];

const sorter = new ProductSorter(new SortByName());
console.log('sorted by name:');
sorter.sort(products).forEach(p => console.log(p.getInfo()));

sorter.setStrategy(new SortByPrice());
console.log('\nsorted by price:');
sorter.sort(products).forEach(p => console.log(p.getInfo()));
