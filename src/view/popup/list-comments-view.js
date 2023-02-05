import AbstractView from '../../framework/view/abstract-view';

function createListComments() {
  return `<ul class="film-details__comments-list"></ul>`
}

export default class ListCommentsView extends AbstractView {
  get template() {
    return createListComments();
  }
}
