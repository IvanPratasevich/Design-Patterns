import { TaskState } from './TaskState';
import { Task } from '../models/Task';

export class CompletedState implements TaskState {
  getName(): string {
    return 'Completed';
  }

  getIcon(): string {
    return 'fa-check-circle';
  }

  getColor(): string {
    return 'success';
  }

  next(task: Task): void {
    task.status = 'todo';
  }
}
