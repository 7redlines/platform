import { groupBy, GroupedObservable } from 'rxjs/operator/groupBy';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { exhaustMap } from 'rxjs/operator/exhaustMap';
import { map } from 'rxjs/operator/map';
import { dematerialize } from 'rxjs/operator/dematerialize';
import { filter } from 'rxjs/operator/filter';
import { concat } from 'rxjs/observable/concat';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Notification } from 'rxjs/Notification';
import { ErrorHandler, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { EffectSources } from './../effect_sources';
import { Provider } from '@angular/compiler/src/core';

@Injectable()
export class NgEffectSources extends EffectSources {
  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }
}

export const EFFECTS_SOURCES_PROVIDERS: Provider[] = [
  NgEffectSources,
  { provide: EffectSources, useExisting: NgEffectSources },
];
