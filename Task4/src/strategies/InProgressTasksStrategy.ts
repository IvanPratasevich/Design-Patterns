import { FilterStrategy } from './FilterStrategy';
import { Task } from '../models/Task';

export class InProgressTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === 'in-progress');
  }

  getName(): string {
    return 'In Progress';
  }
}
