import {
  Action,
  ActionReducer,
  ActionReducerMap,
  ActionReducerFactory,
  StoreFeature,
  InitialState,
  MetaReducer,
} from './models';
import { compose, combineReducers, createReducerFactory } from './utils';
import { ActionsSubject } from './actions_subject';
import { ReducerManager, ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { Store } from './store';

export class StoreRootModule {
  constructor(
    actions$: ActionsSubject,
    reducer$: ReducerObservable,
    scannedActions$: ScannedActionsSubject,
    store: Store<any>
  ) {}
}

export class StoreFeatureModule {
  constructor(
    private features: StoreFeature<any, any>[],
    private featureReducers: ActionReducerMap<any>[],
    private reducerManager: ReducerManager,
    root: StoreRootModule
  ) {
    features
      .map((feature, index) => {
        const featureReducerCollection = featureReducers.shift();
        const reducers = featureReducerCollection /*TODO(#823)*/![index];

        return {
          ...feature,
          reducers,
          initialState: _initialStateFactory(feature.initialState),
        };
      })
      .forEach(feature => reducerManager.addFeature(feature));
  }

  dispose() {
    this.features.forEach(feature =>
      this.reducerManager.removeFeature(feature)
    );
  }
}

export type StoreConfig<T, V extends Action = Action> = {
  initialState?: InitialState<T>;
  reducerFactory?: ActionReducerFactory<T, V>;
  metaReducers?: MetaReducer<T, V>[];
};

export function _initialStateFactory(initialState: any): any {
  if (typeof initialState === 'function') {
    return initialState();
  }

  return initialState;
}
