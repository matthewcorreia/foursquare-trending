export function fetchItemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_ITEMS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function fetchItemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_ITEMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'FETCH_ITEMS_SUCCESS':
      return action.items;

    default:
      return state;
  }
}
