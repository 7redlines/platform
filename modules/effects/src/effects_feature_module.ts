import { StoreRootModule, StoreFeatureModule } from '@ngrx/store';
import { EffectsRootModule } from './effects_root_module';

export class EffectsFeatureModule {
  constructor(
    private root: EffectsRootModule,
    effectSourceGroups: any[][],
    storeRootModule: StoreRootModule,
    storeFeatureModule: StoreFeatureModule
  ) {
    effectSourceGroups.forEach(group =>
      group.forEach(effectSourceInstance =>
        root.addEffects(effectSourceInstance)
      )
    );
  }
}
