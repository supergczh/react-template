import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../src/routes/routers'
import { Provider } from 'react-redux';
import store from './middle.js'

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/workboxServiceWorker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

const root = document.getElementById('root')

const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          {renderRoutes(routes)}
        </Router>
      </Provider>
      ,
      root
    )
}

render()

if (module.hot) {
  module.hot.accept();
}