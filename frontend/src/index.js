import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './slices/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // or your CSS file where tailwind directives are added

import './styles/fonts.css';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>

    <BrowserRouter> {/* <-- wrap your app here! */}
      <App />
    </BrowserRouter>
  </Provider>
);
