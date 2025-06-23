import { ThemeManager } from '../theme/ThemeManager';

export class ThemeToggle {
  private container: HTMLElement | null;
  private themeManager: ThemeManager = ThemeManager.getInstance();

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    this.render();
  }

  private render(): void {
    if (!this.container) return;

    const isDarkTheme = this.themeManager.getTheme() === 'dark';

    const toggleHtml = `
      <button class="button theme-toggle" id="theme-toggle">
        <span class="icon">
          <i class="fas ${isDarkTheme ? 'fa-sun' : 'fa-moon'}"></i>
        </span>
        <span>${isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    `;

    this.container.innerHTML = toggleHtml;

    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.themeManager.toggleTheme();
        this.render();
      });
    }
  }
}
