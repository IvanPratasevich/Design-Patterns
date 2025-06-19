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
    public warranty?: number,
    public volume?: number,
    public hasFreezer?: boolean,
    public energyClass?: string,
  ) {}

  getInfo() {
    return (
      `${this.name}: $${this.price}, ` +
      `${this.warranty ? `${this.warranty} years warranty, ` : ''}` +
      `${this.volume ? `${this.volume}L, ` : ''}` +
      `${this.hasFreezer !== undefined ? `Freezer: ${this.hasFreezer ? 'Yes' : 'No'}, ` : ''}` +
      `${this.energyClass ? `Energy: ${this.energyClass}` : ''}`
    );
  }
}
