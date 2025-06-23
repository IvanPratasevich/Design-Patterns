import { FilterStrategy } from './FilterStrategy';
import { AllTasksStrategy } from './AllTasksStrategy';
import { Task } from '../models/Task';

export class FilterContext {
  private strategy: FilterStrategy;

  constructor(strategy: FilterStrategy = new AllTasksStrategy()) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: FilterStrategy): void {
    this.strategy = strategy;
  }

  public filterTasks(tasks: Task[]): Task[] {
    return this.strategy.filter(tasks);
  }

  public getStrategyName(): string {
    return this.strategy.getName();
  }
}
