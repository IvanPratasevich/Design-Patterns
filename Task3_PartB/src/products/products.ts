export interface Product {
  name: string;
  price: number;
  getInfo(): string;
}

export class FoodProduct implements Product {
  constructor(
    public name: string,
    public price: number,
    public calories: number,
  ) {}
  getInfo() {
    return `${this.name}: $${this.price}, ${this.calories} kcal`;
  }
}

export class TechProduct implements Product {
  constructor(
    public name: string,
    public price: number,
    public warranty: number,
  ) {}
  getInfo() {
    return `${this.name}: $${this.price}, ${this.warranty} years warranty`;
  }
}

export class FridgeProduct implements Product {
  constructor(
    public name: string,
    public price: number,
    public volume: number,
    public hasFreezer: boolean,
    public energyClass: string,
  ) {}
  getInfo() {
    return `${this.name}: $${this.price}, ${this.volume}L, Freezer: ${this.hasFreezer ? 'Yes' : 'No'}, Energy: ${this.energyClass}`;
  }
}
