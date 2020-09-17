import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import MemoStore, { memoReducer } from './memo/Store';

// setting Redux Persist
const persistConfig = {
  key: 'memo',
  storage: storage,
  blacklist: ['message', 'mode', 'fdata'],
  whitelist: ['data']
};

// create persist reducer
const persistedReducer = persistReducer(persistConfig, memoReducer);

// create store, persister
let store = createStore(persistedReducer);
let pstore = persistStore(store);



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<p>loading...</p>}
      persistor={pstore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
export default pstore;