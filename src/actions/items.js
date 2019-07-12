import { clientId, clientSecret } from '../secrets'

export function fetchItemsHasErrored(bool) {
  return {
    type: 'FETCH_ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function fetchItemsIsLoading(bool) {
  return {
    type: 'FETCH_ITEMS_IS_LOADING',
    isLoading: bool
  };
}

export function fetchItemsSuccess(items) {
  return {
    type: 'FETCH_ITEMS_SUCCESS',
    items: items
  };
}

export function fetchItems(location) {
  return (dispatch) => {
    dispatch(fetchItemsIsLoading(true));

    fetch(`https://api.foursquare.com/v2/venues/trending?near=${location}&client_id=${clientId}&client_secret=${clientSecret}&v=20190701`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(fetchItemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchItemsSuccess(json.response.venues));
      })
      .catch(() => dispatch(fetchItemsHasErrored(true)));
  };
}
