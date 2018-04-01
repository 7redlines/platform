import { Injectable, Inject, OnDestroy, Provider } from '@angular/core';
import { INITIAL_STATE, INITIAL_REDUCERS, REDUCER_FACTORY } from './tokens';
import {
  ReducerManager,
  ReducerManagerDispatcher,
  ReducerObservable,
  ActionReducerMap,
  ActionReducerFactory,
} from '..';
import { NgActionsSubject } from './actions_subject';

@Injectable()
export class NgReducerManager extends ReducerManager implements OnDestroy {
  constructor(
    dispatcher: ReducerManagerDispatcher,
    @Inject(INITIAL_STATE) initialState: any,
    @Inject(INITIAL_REDUCERS) reducers: ActionReducerMap<any, any>,
    @Inject(REDUCER_FACTORY) reducerFactory: ActionReducerFactory<any, any>
  ) {
    super(dispatcher, initialState, reducers, reducerFactory);
  }

  ngOnDestroy() {
    this.dispose();
  }
}

export const REDUCER_MANAGER_PROVIDERS: Provider[] = [
  NgReducerManager,
  { provide: ReducerManager, useExisting: NgReducerManager },
  { provide: ReducerObservable, useExisting: NgReducerManager },
  { provide: ReducerManagerDispatcher, useExisting: NgActionsSubject },
];
