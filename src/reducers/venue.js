export function fetchVenueHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_VENUE_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function fetchVenueIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_VENUE_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function venue(state = {}, action) {
  switch (action.type) {
    case 'FETCH_VENUE_SUCCESS':
      return action.venue;

    default:
      return state;
  }
}

export function page(state = 'one', action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;

    default:
      return state;
  }
}
