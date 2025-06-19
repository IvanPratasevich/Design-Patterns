import {
  FoodProduct,
  FridgeProduct,
  Product,
  TechProduct,
} from '../products/products';

export interface ProductBuilder {
  setName(name: string): this;
  setPrice(price: number): this;
  build(): Product;
}

export class FoodProductBuilder implements ProductBuilder {
  private name: string = '';
  private price: number = 0;
  private calories: number = 0;

  setName(name: string): this {
    this.name = name;
    return this;
  }
  setPrice(price: number): this {
    this.price = price;
    return this;
  }
  setCalories(calories: number): this {
    this.calories = calories;
    return this;
  }
  build(): FoodProduct {
    if (!this.name || this.price <= 0 || this.calories <= 0) {
      throw new Error('food');
    }
    return new FoodProduct(this.name, this.price, this.calories);
  }
}

export class TechProductBuilder implements ProductBuilder {
  private name: string = '';
  private price: number = 0;
  private warranty: number = 0;

  setName(name: string): this {
    this.name = name;
    return this;
  }
  setPrice(price: number): this {
    this.price = price;
    return this;
  }
  setWarranty(warranty: number): this {
    this.warranty = warranty;
    return this;
  }
  build(): TechProduct {
    if (!this.name || this.price <= 0 || this.warranty <= 0) {
      throw new Error('laptop');
    }
    return new TechProduct(this.name, this.price, this.warranty);
  }
}

export class FridgeProductBuilder implements ProductBuilder {
  private name: string = '';
  private price: number = 0;
  private volume: number = 0;
  private hasFreezer: boolean = false;
  private energyClass: string = 'A';

  setName(name: string): this {
    this.name = name;
    return this;
  }
  setPrice(price: number): this {
    this.price = price;
    return this;
  }
  setVolume(volume: number): this {
    this.volume = volume;
    return this;
  }
  setHasFreezer(hasFreezer: boolean): this {
    this.hasFreezer = hasFreezer;
    return this;
  }
  setEnergyClass(energyClass: string): this {
    this.energyClass = energyClass;
    return this;
  }
  build(): FridgeProduct {
    if (
      !this.name ||
      this.price <= 0 ||
      this.volume <= 0 ||
      !this.energyClass
    ) {
      throw new Error('fridge');
    }
    return new FridgeProduct(
      this.name,
      this.price,
      this.volume,
      this.hasFreezer,
      this.energyClass,
    );
  }
}
