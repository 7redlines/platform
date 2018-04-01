import { NgModule, Inject, Optional } from '@angular/core';
import {
  StoreRootModule,
  StoreFeatureModule,
  NgStoreFeatureModule,
  NgStoreRootModule,
} from '@ngrx/store';
import { NgEffectsRootModule } from './effects_root_module';
import { FEATURE_EFFECTS } from './tokens';
import { EffectsFeatureModule } from '../effects_feature_module';

@NgModule({})
export class NgEffectsFeatureModule extends EffectsFeatureModule {
  constructor(
    root: NgEffectsRootModule,
    @Inject(FEATURE_EFFECTS) effectSourceGroups: any[][],
    @Optional() storeRootModule: NgStoreRootModule,
    @Optional() storeFeatureModule: NgStoreFeatureModule
  ) {
    super(root, effectSourceGroups, storeRootModule, storeFeatureModule);
  }
}
