import { History } from "history";
import { routerMiddleware, routerReducer } from "react-router-redux";
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    GenericStoreEnhancer,
    ReducersMapObject,
    Store,
    StoreEnhancerStoreCreator
} from "redux";
import thunk from "redux-thunk";
import { IAppState } from "./model";
import { Reducers } from "./reducer";
import * as StoreModule from "./reducer";

export default function configureStore(
    history: History,
    initialState?: IAppState
) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined =
        typeof window === "undefined" ? null : (window as any);
    //If devTools is installed, connect to it
    const devToolsExtension =
        windowIfDefined &&
        (windowIfDefined.devToolsExtension as () => GenericStoreEnhancer);

    const createStoreWithMiddleware: any = compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension
            ? devToolsExtension()
            : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(Reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<
        IAppState
        >;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept("./reducer", () => {
            const nextRootReducer = require<typeof StoreModule>("./reducer");
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers) {
    return combineReducers<IAppState>(
        Object.assign({}, allReducers, { routing: routerReducer })
    );
}
