import { Observer } from './Observer';

export class Subject {
  private observer: Observer | null = null;

  public subscribe(observer: Observer): void {
    this.observer = observer;
  }

  public unsubscribe(): void {
    this.observer = null;
  }

  public notifyObserver(): void {
    if (this.observer) {
      this.observer.update(this);
    }
  }
}
