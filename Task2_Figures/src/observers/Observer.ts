import { Subject } from './Subject';

export abstract class Observer {
  public abstract update(subject: Subject): void;
}
