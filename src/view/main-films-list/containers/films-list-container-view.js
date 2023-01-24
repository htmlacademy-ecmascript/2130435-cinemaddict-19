import AbstractView from '../../../framework/view/abstract-view.js';

function createFilmsListContainer() {
  return '<div class="films-list__container"></div>';
}

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainer();
  }
}
