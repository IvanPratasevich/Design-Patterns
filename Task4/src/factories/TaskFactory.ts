import { Task, Priority, TaskStatus } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

export class TaskFactory {
  public createTask(
    title: string,
    description: string,
    priority: Priority,
    status: TaskStatus = 'todo'
  ): Task {
    return {
      id: this.generateId(),
      title,
      description,
      status,
      createdAt: new Date(),
      priority,
    };
  }

  private generateId(): string {
    return uuidv4();
  }
}
