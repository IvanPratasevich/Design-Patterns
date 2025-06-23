import { TaskState } from './TaskState';
import { Task } from '../models/Task';

export class InProgressState implements TaskState {
  getName(): string {
    return 'In Progress';
  }

  getIcon(): string {
    return 'fa-spinner';
  }

  getColor(): string {
    return 'warning';
  }

  next(task: Task): void {
    task.status = 'completed';
  }
}
