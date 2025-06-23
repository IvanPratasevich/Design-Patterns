export class ThemeManager {
  private static instance: ThemeManager;
  private isDarkTheme: boolean;

  private constructor() {
    const savedTheme = localStorage.getItem('darkTheme');
    this.isDarkTheme = savedTheme ? JSON.parse(savedTheme) : false;

    this.applyTheme();
  }

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    localStorage.setItem('darkTheme', JSON.stringify(this.isDarkTheme));

    this.applyTheme();
  }

  public getTheme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }

  private applyTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
