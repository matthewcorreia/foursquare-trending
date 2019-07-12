export function page(state = 'one', action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;

    default:
      return state;
  }
}
