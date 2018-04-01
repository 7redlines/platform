import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { EffectSources } from './../effect_sources';
import { ACTIONS_PROVIDERS } from './actions';
import { ROOT_EFFECTS, FEATURE_EFFECTS } from './tokens';
import { NgEffectsFeatureModule } from './effects_feature_module';
import { NgEffectsRootModule } from './effects_root_module';
import { EFFECTS_RUNNER_PROVIDERS } from './effects_runner';
import { EFFECTS_SOURCES_PROVIDERS } from './effect_sources';

@NgModule({})
export class EffectsModule {
  static forFeature(featureEffects: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: NgEffectsFeatureModule,
      providers: [
        featureEffects,
        {
          provide: FEATURE_EFFECTS,
          multi: true,
          deps: featureEffects,
          useFactory: createSourceInstances,
        },
      ],
    };
  }

  static forRoot(rootEffects: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: NgEffectsRootModule,
      providers: [
        EFFECTS_RUNNER_PROVIDERS,
        EFFECTS_SOURCES_PROVIDERS,
        ACTIONS_PROVIDERS,
        rootEffects,
        {
          provide: ROOT_EFFECTS,
          deps: rootEffects,
          useFactory: createSourceInstances,
        },
      ],
    };
  }
}

export function createSourceInstances(...instances: any[]) {
  return instances;
}
