import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { I18nProvider } from './_react_builder/i18n/I18nProvider.tsx';
import { Provider } from 'react-redux';
import store from './_core/features/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nProvider defaultLang='en'>
        <App />
      </I18nProvider>
    </Provider>
  </StrictMode>
);
