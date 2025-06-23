import { TaskState } from './TaskState';
import { TodoState } from './TodoState';
import { InProgressState } from './InProgressState';
import { CompletedState } from './CompletedState';
import { Task } from '../models/Task';

export class TaskStateContext {
  private todoState: TaskState;
  private inProgressState: TaskState;
  private completedState: TaskState;

  constructor() {
    this.todoState = new TodoState();
    this.inProgressState = new InProgressState();
    this.completedState = new CompletedState();
  }

  public getState(task: Task): TaskState {
    switch (task.status) {
      case 'todo':
        return this.todoState;
      case 'in-progress':
        return this.inProgressState;
      case 'completed':
        return this.completedState;
      default:
        return this.todoState;
    }
  }

  public nextState(task: Task): void {
    const currentState = this.getState(task);
    console.log(currentState);
    currentState.next(task);
  }
}
