/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';
import { ENABLE_REDUX_LOGGER } from 'src/config';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'root',
  storage,
}

const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer)

export function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  let persistor = persistStore(store)

  return { store, persistor };
}
