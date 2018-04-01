import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { EffectSources } from './effect_sources';

export class EffectsRunner {
  private effectsSubscription: Subscription | null = null;

  constructor(
    private effectSources: EffectSources,
    private store: Store<any>
  ) {}

  start() {
    if (!this.effectsSubscription) {
      this.effectsSubscription = this.effectSources
        .toActions()
        .subscribe(this.store);
    }
  }

  dispose() {
    if (this.effectsSubscription) {
      this.effectsSubscription.unsubscribe();
      this.effectsSubscription = null;
    }
  }
}
