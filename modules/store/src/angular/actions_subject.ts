import { Injectable, OnDestroy, Provider } from '@angular/core';
import { ActionsSubject } from './../';

@Injectable()
export class NgActionsSubject extends ActionsSubject implements OnDestroy {
  constructor() {
    super();
  }

  ngOnDestroy() {
    this.dispose();
  }
}

export const ACTIONS_SUBJECT_PROVIDERS: Provider[] = [
  NgActionsSubject,
  { provide: ActionsSubject, useExisting: NgActionsSubject },
];
