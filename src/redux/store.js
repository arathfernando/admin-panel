import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const configureStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint-disable */
      const nextRootReducer = require('./reducers');
      /* eslint-enable */
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
export default configureStore;
