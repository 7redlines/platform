import { Subject } from 'rxjs/Subject';
import { Action } from './models';

export class ScannedActionsSubject extends Subject<Action> {
  dispose() {
    this.complete();
  }
}
