import { combineReducers } from 'redux';
import { items, fetchItemsHasErrored, fetchItemsIsLoading } from './items';
import { venue, fetchVenueHasErrored, fetchVenueIsLoading } from './venue';
import { page } from './common';


export default combineReducers({
  items,
  venue,
  page,
  fetchItemsHasErrored,
  fetchItemsIsLoading,
  fetchVenueHasErrored,
  fetchVenueIsLoading
});
