import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Action } from './models';

export const INIT = '@ngrx/store/init' as '@ngrx/store/init';

export class ActionsSubject extends BehaviorSubject<Action> {
  constructor() {
    super({ type: INIT });
  }

  next(action: Action): void {
    if (typeof action === 'undefined') {
      throw new TypeError(`Actions must be objects`);
    } else if (typeof action.type === 'undefined') {
      throw new TypeError(`Actions must have a type property`);
    }

    super.next(action);
  }

  complete() {
    /* noop */
  }

  dispose() {
    super.complete();
  }
}
