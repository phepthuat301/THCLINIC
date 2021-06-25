import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import myReducer from './redux/reducers';
const myStore = createStore(myReducer,applyMiddleware(thunk));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

  