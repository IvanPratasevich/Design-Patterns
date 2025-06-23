import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { ThemeToggle } from './ThemeToggle';

export class App {
  private appContainer: HTMLElement | null;

  constructor(containerId: string) {
    this.appContainer = document.getElementById(containerId);
    if (!this.appContainer) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    this.render();
    this.initComponents();
  }

  private render(): void {
    if (!this.appContainer) return;

    const appHtml = `
      <div class="container mt-5">
        <div class="columns is-multiline">
          <div class="column is-full">
            <div id="theme-toggle-container" class="is-flex is-justify-content-flex-end mb-2"></div>
          </div>
          <div class="column is-full">
          </div>
          <div class="column is-full">
            <div id="task-form-container" class="mb-4"></div>
          </div>
          <div class="column is-full">
            <div id="task-list-container">
              <div class="filter-container buttons has-addons mb-4"></div>
              <div class="task-list"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.appContainer.innerHTML = appHtml;
  }

  private initComponents(): void {
    new TaskForm('task-form-container');
    new TaskList('task-list-container');
    new ThemeToggle('theme-toggle-container');
  }
}
