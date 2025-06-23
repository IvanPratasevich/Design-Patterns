import { FilterStrategy } from './FilterStrategy';
import { Task } from '../models/Task';

export class AllTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }

  getName(): string {
    return 'All';
  }
}
