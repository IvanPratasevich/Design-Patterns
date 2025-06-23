import { Task } from '../models/Task';

export interface TaskState {
  getName(): string;
  getIcon(): string;
  getColor(): string;
  next(task: Task): void;
}
