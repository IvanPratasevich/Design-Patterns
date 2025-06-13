import { Component } from '../component/component';
import { TASK_STATUS } from '../constants/constants';
import { Developer, Observer } from '../developer/developer';

export class Task extends Component {
  private status: string;
  private observers: Observer[] = [];

  constructor(name: string, status: string = TASK_STATUS.New) {
    super(name);
    this.status = status;
  }

  display(str: string = ''): void {
    console.log(`${str}Task: ${this.name} (${this.status})`);
  }

  setStatus(status: string): void {
    this.status = status;
    this.notify();
  }

  getStatus(): string {
    return this.status;
  }

  addObserver(observer: Developer): void {
    this.observers.push(observer);
    console.log(`${observer.name} (${observer.email}) assigned to ${this.name}`);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
