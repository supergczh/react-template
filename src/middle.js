import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index';
import rootSage from './redux/saga'


const sagaMiddleware = createSagaMiddleware()

const prodStore = createStore(rootReducer,applyMiddleware(sagaMiddleware))

const devStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

if (module.hot) {
  module.hot.accept("./redux/reducers", () => {
    const nextRootReducer = require("./redux/reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

let store;

if (process.env.NODE_ENV === "production") {
  store = prodStore;
} else {
  store = devStore;
}

sagaMiddleware.run(rootSage);

export default store;