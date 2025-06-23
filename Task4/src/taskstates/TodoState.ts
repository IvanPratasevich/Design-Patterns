import { TaskState } from './TaskState';
import { Task } from '../models/Task';

export class TodoState implements TaskState {
  getName(): string {
    return 'To Do';
  }

  getIcon(): string {
    return 'fa-circle';
  }

  getColor(): string {
    return 'info';
  }

  next(task: Task): void {
    task.status = 'in-progress';
  }
}
