import { combineReducers } from 'redux';
import { items, venue, page, fetchDataHasErrored, fetchDataIsLoading } from './reducers';

export default combineReducers({
  items,
  venue,
  page,
  fetchDataHasErrored,
  fetchDataIsLoading
});
