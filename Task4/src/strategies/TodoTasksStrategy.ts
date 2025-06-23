import { FilterStrategy } from './FilterStrategy';
import { Task } from '../models/Task';

export class TodoTasksStrategy implements FilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === 'todo');
  }

  getName(): string {
    return 'To Do';
  }
}
