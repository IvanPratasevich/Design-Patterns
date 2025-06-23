import { FilterStrategy } from './FilterStrategy';
import { Task } from '../models/Task';

export class CompletedTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === 'completed');
  }

  getName(): string {
    return 'Completed';
  }
}
