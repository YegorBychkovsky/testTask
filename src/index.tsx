import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './i18';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);
