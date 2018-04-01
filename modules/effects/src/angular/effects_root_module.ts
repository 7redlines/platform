import { NgModule, Inject, Optional } from '@angular/core';
import {
  StoreModule,
  Store,
  StoreRootModule,
  StoreFeatureModule,
} from '@ngrx/store';
import { NgStoreRootModule, NgStoreFeatureModule } from '@ngrx/store';
import { EffectsRunner } from './../effects_runner';
import { EffectSources } from './../effect_sources';
import { ROOT_EFFECTS } from './tokens';
import { EffectsRootModule } from './../effects_root_module';

export const ROOT_EFFECTS_INIT = '@ngrx/effects/init';

@NgModule({})
export class NgEffectsRootModule extends EffectsRootModule {
  constructor(
    sources: EffectSources,
    runner: EffectsRunner,
    store: Store<any>,
    @Inject(ROOT_EFFECTS) rootEffects: any[],
    @Optional() storeRootModule: NgStoreRootModule,
    @Optional() storeFeatureModule: NgStoreFeatureModule
  ) {
    super(
      sources,
      runner,
      store,
      rootEffects,
      storeRootModule,
      storeFeatureModule
    );
  }
}
