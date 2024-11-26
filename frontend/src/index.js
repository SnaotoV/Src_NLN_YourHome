import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import reduxStore, { persistor } from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      {/* Dùng PersistGate để chờ Redux Store và Persistor sẵn sàng */}
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Nếu bạn muốn đo hiệu suất ứng dụng, có thể bật tính năng này
reportWebVitals();