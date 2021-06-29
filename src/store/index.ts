import {applyMiddleware, createStore, EmptyObject, Store} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer/reducer";
import {CartItems} from "./reducer/rootReducer";

const persistConfig = {
    key: 'redux-alex',
    storage
};

export function configureStore() {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: Store<EmptyObject & {reducer: CartItems}> = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    const persistor = persistStore(store);
    return { store, persistor };
}