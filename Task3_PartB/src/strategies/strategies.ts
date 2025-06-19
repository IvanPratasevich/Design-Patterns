import { Product } from '../products/products';
export interface SortStrategy {
  sort(products: Product[]): Product[];
}

export class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return products.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
}

export class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return products.slice().sort((a, b) => a.price - b.price);
  }
}

export class ProductSorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }
  sort(products: Product[]): Product[] {
    return this.strategy.sort(products);
  }
}
