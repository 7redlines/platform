import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  ActionReducerFactory,
  MetaReducer,
  StoreFeature,
} from './models';
import {
  omit,
  createReducerFactory,
  createFeatureReducerFactory,
} from './utils';
import { ActionsSubject } from './actions_subject';

export abstract class ReducerObservable extends Observable<
  ActionReducer<any, any>
> {}
export abstract class ReducerManagerDispatcher extends ActionsSubject {}
export const UPDATE = '@ngrx/store/update-reducers' as '@ngrx/store/update-reducers';

export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
  constructor(
    private dispatcher: ReducerManagerDispatcher,
    private initialState: any,
    private reducers: ActionReducerMap<any, any>,
    private reducerFactory: ActionReducerFactory<any, any>
  ) {
    super(reducerFactory(reducers, initialState));
  }

  addFeature({
    reducers,
    reducerFactory,
    metaReducers,
    initialState,
    key,
  }: StoreFeature<any, any>) {
    const reducer =
      typeof reducers === 'function'
        ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
        : createReducerFactory(reducerFactory, metaReducers)(
            reducers,
            initialState
          );

    this.addReducer(key, reducer);
  }

  removeFeature({ key }: StoreFeature<any, any>) {
    this.removeReducer(key);
  }

  addReducer(key: string, reducer: ActionReducer<any, any>) {
    this.reducers = { ...this.reducers, [key]: reducer };

    this.updateReducers(key);
  }

  removeReducer(key: string) {
    this.reducers = omit(this.reducers, key) /*TODO(#823)*/ as any;

    this.updateReducers(key);
  }

  private updateReducers(key: string) {
    this.next(this.reducerFactory(this.reducers, this.initialState));
    this.dispatcher.next(<Action & { feature: string }>{
      type: UPDATE,
      feature: key,
    });
  }

  dispose() {
    this.complete();
  }
}
