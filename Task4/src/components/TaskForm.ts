import { TaskFacade } from '../facades/TaskFacade';
import { Priority, TaskStatus } from '../models/Task';

export class TaskForm {
  private container: HTMLElement | null;
  private taskFacade: TaskFacade = new TaskFacade();

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    if (!this.container) return;

    const formHtml = `
      <div class="box">
        <h2 class="title is-4">Add New Task</h2>
        <form id="task-form">
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" id="task-title" name="title" placeholder="Task title" required>
                </div>
                <p class="help is-danger" id="title-error" style="display: none;"></p>
              </div>
            </div>
            
            <div class="column is-half">
              <div class="field">
                <label class="label">Priority</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select id="task-priority" name="priority">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="column is-half">
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea class="textarea" id="task-description" name="description" placeholder="Task description" required></textarea>
                </div>
                <p class="help is-danger" id="description-error" style="display: none;"></p>
              </div>
            </div>
            
            <div class="column is-half">
              <div class="field">
                <label class="label">Status</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select id="task-status" name="status">
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="field is-grouped mt-4 is-justify-content-flex-end">
                <div class="control">
                  <button class="button is-primary" type="submit">
                    <span class="icon">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span>Add Task</span>
                  </button>
                </div>
                <div class="control">
                  <button class="button is-danger" type="button" id="reset-all-btn">
                    <span class="icon">
                      <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;

    this.container.innerHTML = formHtml;
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    const form = this.container.querySelector('#task-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }

    const resetButton = this.container.querySelector('#reset-all-btn');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.handleResetAll();
      });
    }
  }

  private handleResetAll(): void {
    if (confirm('You want to delete all tasks? ')) {
      try {
        localStorage.removeItem('tasks');
        console.log('All tasks have been deleted.');

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error('Error resetting tasks:', error);
      }
    }
  }

  private handleFormSubmit(): void {
    try {
      if (!this.container) return;

      const form = document.querySelector('#task-form');
      if (!(form instanceof HTMLFormElement)) {
        throw new Error('Form not found');
      }

      const formData = new FormData(form);
      const title = formData.get('title')?.toString().trim() || '';
      const description = formData.get('description')?.toString().trim() || '';
      const priority = (formData.get('priority')?.toString() as Priority) || 'low';
      const status = (formData.get('status')?.toString() as TaskStatus) || 'todo';

      this.resetErrorMessages();

      let hasError = false;

      if (!title) {
        this.showInputError('title-error', 'Title is required');
        hasError = true;
      }

      if (!description) {
        this.showInputError('description-error', 'Description is required');
        hasError = true;
      }

      if (hasError) {
        return;
      }

      this.taskFacade.createTask(title, description, priority, status);

      form.reset();

      console.log('Task added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  private resetErrorMessages(): void {
    const titleError = document.getElementById('title-error');
    const descriptionError = document.getElementById('description-error');

    if (titleError) {
      titleError.textContent = '';
      titleError.style.display = 'none';
    }

    if (descriptionError) {
      descriptionError.textContent = '';
      descriptionError.style.display = 'none';
    }
  }

  private showInputError(elementId: string, message: string): void {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }
}
