import { clientId, clientSecret } from '../secrets'

export function fetchVenueHasErrored(bool) {
  return {
    type: 'FETCH_VENUE_HAS_ERRORED',
    hasErrored: bool
  };
}

export function fetchVenueIsLoading(bool) {
  return {
    type: 'FETCH_VENUE_IS_LOADING',
    isLoading: bool
  };
}

export function fetchVenueSuccess(venue) {
  return {
    type: 'FETCH_VENUE_SUCCESS',
    venue: venue
  };
}

export function fetchVenue(venueId) {
  return (dispatch) => {
    dispatch(fetchVenueIsLoading(true));

    fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20190701`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(fetchVenueIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchVenueSuccess(json.response.venue));
      })
      .catch(() => dispatch(fetchVenueHasErrored(true)));
  };
}

export function clearVenue() {
  return (dispatch) => dispatch(fetchVenueSuccess({}));
}
