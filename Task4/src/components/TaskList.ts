import type { Task } from '../models/Task';
import type { Observer } from '../observers/Observer';
import { TaskManager } from '../models/TaskManager';
import { FilterContext } from '../strategies/FilterContext';
import { AllTasksStrategy } from '../strategies/AllTasksStrategy';
import { TodoTasksStrategy } from '../strategies/TodoTasksStrategy';
import { InProgressTasksStrategy } from '../strategies/InProgressTasksStrategy';
import { CompletedTasksStrategy } from '../strategies/CompletedTasksStrategy';
import { TaskStateContext } from '../taskstates/TaskStateContext';
import { TaskFacade } from '../facades/TaskFacade';

export class TaskList implements Observer {
  private container: HTMLElement | null;
  private taskManager: TaskManager = TaskManager.getInstance();
  private taskFacade: TaskFacade = new TaskFacade();
  private filterContext: FilterContext = new FilterContext();
  private taskStateContext: TaskStateContext = new TaskStateContext();
  private strategies: Array<{ name: string; strategy: any }>;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID "${containerId}" not found`);
      this.container = null;
    }

    this.strategies = [
      { name: 'All', strategy: new AllTasksStrategy() },
      { name: 'To Do', strategy: new TodoTasksStrategy() },
      { name: 'In Progress', strategy: new InProgressTasksStrategy() },
      { name: 'Completed', strategy: new CompletedTasksStrategy() },
    ];

    this.taskManager.attach(this);

    this.render();
    this.setupFilterButtons();
  }

  public update(): void {
    try {
      this.render();
    } catch (error) {
      console.error('Error updating task list:', error);
    }
  }

  private render(): void {
    if (!this.container) return;

    try {
      const tasks = this.filterContext.filterTasks(this.taskFacade.getAllTasks());

      const taskListContainer = this.container.querySelector('.task-list');
      if (taskListContainer) {
        if (tasks.length === 0) {
          taskListContainer.innerHTML = `
            <div class="block">
                No tasks found
            </div>
          `;
        } else {
          const tasksHtml = tasks.map(task => this.createTaskHtml(task)).join('');
          taskListContainer.innerHTML = tasksHtml;

          this.attachTaskEventListeners();
        }
      } else {
        console.error('Task list container not found');
      }
    } catch (error) {
      console.error('Error rendering task list:', error);
    }
  }

  private createTaskHtml(task: Task): string {
    if (!task || !task.id) {
      throw new Error('Invalid task data');
    }

    const taskState = this.taskStateContext.getState(task);
    const statusClass =
      task.status === 'completed'
        ? 'completed'
        : task.status === 'in-progress'
          ? 'in-progress'
          : 'todo';

    const formattedDate = task.createdAt ? this.formatDateTime(task.createdAt) : 'Unknown';
    console.log(taskState.getName());
    return `
      <div class="task-item box priority-${task.priority} ${statusClass}" data-id="${task.id}">
        <div class="task-header">
          <h3 class="title is-5">${task.title || 'Untitled'}</h3>
          <div class="task-actions">
            <button class="button is-small is-${taskState.getColor()} task-status-btn" data-task-id="${task.id}">
              <span class="icon"><i class="fas ${taskState.getIcon()}"></i></span>
            </button>
            <button class="button is-small is-danger task-delete-btn" data-task-id="${task.id}">
              <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
          </div>
        </div>
        <div class="task-description">
          ${task.description || ''}
        </div>
        <div class="task-meta is-size-7 mt-2">
          <span class="tag is-${this.getPriorityClass(task.priority)} mr-2">Priority: ${task.priority}</span>
          <span class="tag is-${taskState.getColor()} mr-2">Status: ${taskState.getName()}</span>
          <span class="has-text-grey">Created: ${formattedDate}</span>
        </div>
      </div>
    `;
  }

  private formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  private attachTaskEventListeners(): void {
    if (!this.container) return;

    const statusButtons = this.container.querySelectorAll('.task-status-btn');
    statusButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        const taskId = (button as HTMLElement).dataset.taskId;
        if (taskId) {
          const task = this.taskFacade.getTaskById(taskId);
          if (task) {
            this.changeTaskState(task);
          }
        }
      });
    });

    const deleteButtons = this.container.querySelectorAll('.task-delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        const taskId = (button as HTMLElement).dataset.taskId;
        if (taskId) {
          this.deleteTask(taskId);
        }
      });
    });
  }

  private getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  }

  private changeTaskState(task: Task): void {
    try {
      this.taskFacade.changeTaskState(task);
    } catch (error) {
      console.error('Error changing task state:', error);
    }
  }

  private deleteTask(id: string): void {
    try {
      if (confirm('you want to delete this task?')) {
        this.taskFacade.removeTask(id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  private setupFilterButtons(): void {
    if (!this.container) return;

    try {
      const filterContainer = this.container.querySelector('.filter-container');
      if (filterContainer) {
        const buttonsHtml = this.strategies
          .map(({ name }) => {
            const isActive = this.filterContext.getStrategyName() === name;
            return `
            <button class="button ${isActive ? 'is-primary' : ''}" data-strategy="${name}">
              ${name}
            </button>
          `;
          })
          .join('');

        filterContainer.innerHTML = buttonsHtml;

        const buttons = filterContainer.querySelectorAll('button');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            const strategyName = button.getAttribute('data-strategy');
            const strategy = this.strategies.find(s => s.name === strategyName)?.strategy;

            if (strategy) {
              this.setFilterStrategy(strategy);

              buttons.forEach(btn => btn.classList.remove('is-primary'));
              button.classList.add('is-primary');
            }
          });
        });
      } else {
        console.error('Filter container not found');
      }
    } catch (error) {
      console.error('Error setting up filter buttons:', error);
    }
  }

  private setFilterStrategy(strategy: any): void {
    try {
      this.filterContext.setStrategy(strategy);
      this.render();
    } catch (error) {
      console.error('Error setting filter strategy:', error);
    }
  }
}
