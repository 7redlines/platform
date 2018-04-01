import { Injectable, Provider, OnDestroy } from '@angular/core';
import { ScannedActionsSubject } from './../';

@Injectable()
export class NgScannedActionsSubject extends ScannedActionsSubject
  implements OnDestroy {
  ngOnDestroy() {
    this.dispose();
  }
}

export const SCANNED_ACTIONS_SUBJECT_PROVIDERS: Provider[] = [
  NgScannedActionsSubject,
  { provide: ScannedActionsSubject, useExisting: NgScannedActionsSubject },
];
