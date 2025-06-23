import { Task } from '../models/Task';

export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
  getName(): string;
}
