import { TaskManager } from '../models/TaskManager';
import { TaskFactory } from '../factories/TaskFactory';
import { TaskStateContext } from '../taskstates/TaskStateContext';
import type { Task, Priority, TaskStatus } from '../models/Task';

export class TaskFacade {
  private taskManager: TaskManager;
  private taskFactory: TaskFactory;
  private taskStateContext: TaskStateContext;

  constructor() {
    this.taskManager = TaskManager.getInstance();
    this.taskFactory = new TaskFactory();
    this.taskStateContext = new TaskStateContext();
  }

  public createTask(
    title: string,
    description: string,
    priority: Priority,
    status: TaskStatus = 'todo'
  ): void {
    try {
      if (!title || !description) {
        throw new Error('Title and description are required');
      }

      const task = this.taskFactory.createTask(title, description, priority, status);
      this.taskManager.addTask(task);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  public removeTask(id: string): void {
    try {
      if (!id) {
        throw new Error('Task ID is required');
      }

      this.taskManager.removeTask(id);
    } catch (error) {
      console.error('Error removing task:', error);
      throw error;
    }
  }

  public changeTaskState(task: Task): void {
    try {
      if (!task || !task.id) {
        throw new Error('Task is required');
      }

      this.taskStateContext.nextState(task);
      this.updateTask(task);
    } catch (error) {
      console.error('Error changing task state:', error);
      throw error;
    }
  }

  private updateTask(task: Task): void {
    try {
      if (!task || !task.id) {
        throw new Error('Task is required');
      }

      this.taskManager.updateTask(task);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  public getAllTasks(): Task[] {
    try {
      return this.taskManager.getTasks();
    } catch (error) {
      console.error('Error getting all tasks:', error);
      return [];
    }
  }

  public getTaskById(id: string): Task | undefined {
    try {
      if (!id) {
        throw new Error('Task ID is required');
      }

      return this.taskManager.getTaskById(id);
    } catch (error) {
      console.error('Error getting task by ID:', error);
      return undefined;
    }
  }
}
