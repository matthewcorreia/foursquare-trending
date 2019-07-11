import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import ItemList from './components/ItemList';
import VenueDetails from './components/VenueDetails';

const store = configureStore();

render(
  <Provider store={store}>
    <div id='col-container'>
      <ItemList />
      <VenueDetails />
    </div>
  </Provider>,
  document.getElementById('app')
);
