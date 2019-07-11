export function fetchDataHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_DATA_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function fetchDataIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_DATA_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS_ITEMS':
      return action.items;

    default:
      return state;
  }
}

export function venue(state = {}, action) {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS_VENUE':
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
