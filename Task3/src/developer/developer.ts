import { Task } from '../task/task';

export abstract class Observer {
  abstract update(task: Task): void;
}

export class Developer implements Observer {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  update(task: Task): void {
    console.log(
      `${this.name} (${this.email}) notified. Task "${task.getName()}" status changed to ${task.getStatus()}`,
    );
  }
}
