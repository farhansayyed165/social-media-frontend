import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'


const container = document.getElementById("root");
const root = createRoot(container);
let persistor = persistStore(store)

root.render(

  <React.StrictMode>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </PersistGate>
      </Provider>
  </React.StrictMode>
)
