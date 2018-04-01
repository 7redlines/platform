import {
  StoreModule,
  Store,
  StoreRootModule,
  StoreFeatureModule,
} from '@ngrx/store';
import { EffectsRunner } from './effects_runner';
import { EffectSources } from './effect_sources';

export const ROOT_EFFECTS_INIT = '@ngrx/effects/init';

export class EffectsRootModule {
  constructor(
    private sources: EffectSources,
    runner: EffectsRunner,
    store: Store<any>,
    rootEffects: any[],
    storeRootModule: StoreRootModule,
    storeFeatureModule: StoreFeatureModule
  ) {
    runner.start();

    rootEffects.forEach(effectSourceInstance =>
      sources.addEffects(effectSourceInstance)
    );

    store.dispatch({ type: ROOT_EFFECTS_INIT });
  }

  addEffects(effectSourceInstance: any) {
    this.sources.addEffects(effectSourceInstance);
  }
}
