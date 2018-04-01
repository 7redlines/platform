import { Injectable, Inject, OnDestroy, Provider } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { observeOn } from 'rxjs/operator/observeOn';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { scan } from 'rxjs/operator/scan';
import {
  State,
  StateObservable,
  ReducerObservable,
  ActionsSubject,
  ScannedActionsSubject,
} from './../';
import { INITIAL_STATE } from './tokens';

@Injectable()
export class NgState<T> extends State<T> implements OnDestroy {
  constructor(
    actions$: ActionsSubject,
    reducer$: ReducerObservable,
    scannedActions: ScannedActionsSubject,
    @Inject(INITIAL_STATE) initialState: any
  ) {
    super(actions$, reducer$, scannedActions, initialState);
  }

  ngOnDestroy() {
    this.dispose();
  }
}

export const STATE_PROVIDERS: Provider[] = [
  NgState,
  { provide: State, useExisting: NgState },
  { provide: StateObservable, useExisting: NgState },
];
