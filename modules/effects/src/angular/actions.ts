import { Injectable, Inject, Provider } from '@angular/core';
import { Action, ScannedActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs/interfaces';
import { Actions } from './../actions';

@Injectable()
export class NgActions<V = Action> extends Actions<V> {
  constructor(@Inject(ScannedActionsSubject) source?: Observable<V>) {
    super(source);
  }

  lift<R>(operator: Operator<V, R>): Observable<R> {
    const observable = new NgActions<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }
}

export const ACTIONS_PROVIDERS: Provider[] = [
  NgActions,
  { provide: Actions, deps: [NgActions], useExisting: NgActions },
];
