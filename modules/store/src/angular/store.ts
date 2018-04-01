import { Injectable, Provider } from '@angular/core';
import { Store, ReducerManager, ActionsSubject, StateObservable } from './../';
import { NgActionsSubject } from './actions_subject';
import { NgReducerManager } from './reducer_manager';

@Injectable()
export class NgStore<T> extends Store<T> {
  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
  }
}

export const STORE_PROVIDERS: Provider[] = [
  NgStore,
  { provide: Store, useExisting: NgStore },
];
