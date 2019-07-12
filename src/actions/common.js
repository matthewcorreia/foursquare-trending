export function changePage(page) {
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
