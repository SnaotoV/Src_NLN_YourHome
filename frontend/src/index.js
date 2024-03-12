import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import reduxStore, { persistor } from './redux';
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App persistor={persistor} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
