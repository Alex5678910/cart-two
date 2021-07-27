import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer/reducer";

const persistConfig = {
    key: 'redux-alex',
    storage
};

const loggerMiddleware = (store: { getState: () => any; }) => (next: (arg0: any) => any) => (action: any) => {
    const result = next(action)
    console.log('loggerMiddleware', store.getState())
    return result
}

export function configureStore() {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
    );
    const persistor = persistStore(store);
    return { store, persistor };
}