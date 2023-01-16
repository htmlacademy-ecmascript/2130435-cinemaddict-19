import AbstractView from '../../../framework/view/abstract-view.js';

function filmDetailsInner() {
  return '<div class="film-details__inner"></div>';
}

export default class FilmDetailsInnerPopupView extends AbstractView {
  get template() {
    return filmDetailsInner();
  }
}
