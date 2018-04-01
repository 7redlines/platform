import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectSources } from './../effect_sources';
import { EffectsRunner } from './../effects_runner';
import { Provider } from '@angular/compiler/src/core';

@Injectable()
export class NgEffectsRunner extends EffectsRunner implements OnDestroy {
  constructor(effectSources: EffectSources, store: Store<any>) {
    super(effectSources, store);
  }

  ngOnDestroy() {
    this.dispose();
  }
}

export const EFFECTS_RUNNER_PROVIDERS: Provider[] = [
  NgEffectsRunner,
  { provide: EffectsRunner, useExisting: NgEffectsRunner },
];
