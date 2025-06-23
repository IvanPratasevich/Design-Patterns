import type { Task } from './Task';
import type { Observer } from '../observers/Observer';
import type { Observable } from '../observers/Observable';

export class TaskManager implements Observable {
  private static instance: TaskManager;
  private tasks: Task[] = [];
  private observers: Observer[] = [];

  private constructor() {
    this.loadTasks();
  }

  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  public addTask(task: Task): void {
    if (!task.id) {
      throw new Error('Task must have an ID');
    }
    this.tasks.push(task);
    this.saveTasks();
    this.notify();
  }

  public removeTask(id: string): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      this.notify();
    } else {
      throw new Error(`Task with ID ${id} not found`);
    }
  }

  public updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...task };
      this.saveTasks();
      this.notify();
    } else {
      throw new Error(`Task with ID ${task.id} not found`);
    }
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  private saveTasks(): void {
    try {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  private loadTasks(): void {
    try {
      const tasksJSON = localStorage.getItem('tasks');
      if (tasksJSON) {
        const loadedTasks = JSON.parse(tasksJSON);
        this.tasks = loadedTasks.map((task: any) => ({
          ...task,
          createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
        }));
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      this.tasks = [];
    }
  }
}
