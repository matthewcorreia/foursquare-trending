import { clientId, clientSecret } from '../secrets'

export function fetchDataHasErrored(bool) {
  return {
    type: 'DATA_HAS_ERRORED',
    hasErrored: bool
  };
}

export function fetchDataIsLoading(bool) {
  return {
    type: 'DATA_IS_LOADING',
    isLoading: bool
  };
}

export function fetchDataSuccessItems(items) {
  return {
    type: 'FETCH_DATA_SUCCESS_ITEMS',
    items: items
  };
}

export function fetchDataSuccessVenue(venue) {
  return {
    type: 'FETCH_DATA_SUCCESS_VENUE',
    venue: venue
  };
}

export function fetchData(type, data) {
  return (dispatch) => {
    dispatch(fetchDataIsLoading(true));

    let url;

    if (type === 'items') {
      url = `https://api.foursquare.com/v2/venues/trending?near=${data}&client_id=${clientId}&client_secret=${clientSecret}&v=20190701`;
    } else if (type === 'venue') {
      url = `https://api.foursquare.com/v2/venues/${data}?client_id=${clientId}&client_secret=${clientSecret}&v=20190701`;
    } else if (type === 'fakeVenue') {
      url = 'https://jsonplaceholder.typicode.com/posts/1'
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(fetchDataIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        if (type === 'items') {
          dispatch(fetchDataSuccessItems(json.response.venues))
        } else if (type === 'venue') {
          dispatch(fetchDataSuccessVenue(json.response.venue))
        } else if (type === 'fakeVenue') {
          console.log('fakeVenue', json);
          dispatch(fetchDataSuccessVenue(json))
        }
      })
      .catch(() => dispatch(fetchDataHasErrored(true)));
  };
}

export function changePage(page) {
  console.log('change to page', page);

  switch (page) {
    case 'two':
      document.getElementById('col-container').classList.add('page-two');
      break;
    case 'one':
      document.getElementById('col-container').classList.remove('page-two');
  }

  return {
    type: 'CHANGE_TO_PAGE',
    page: page
  };
}
