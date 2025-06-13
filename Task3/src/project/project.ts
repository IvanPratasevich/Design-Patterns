import { Component } from '../component/component';

export class Project extends Component {
  private components: Component[] = [];

  add(component: Component): void {
    this.components.push(component);
  }

  remove(component: Component): void {
    this.components = this.components.filter(c => c !== component);
  }

  display(str: string = ''): void {
    console.log(`${str}Project: ${this.name}`);
    for (const component of this.components) {
      component.display(str + '  ');
    }
  }
}
