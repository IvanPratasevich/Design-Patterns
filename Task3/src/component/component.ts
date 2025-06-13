export abstract class Component {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  abstract display(str: string): void;
  getName(): string {
    return this.name;
  }
}
