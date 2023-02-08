import AbstractView from '../../../framework/view/abstract-view';

function createFilmsListContainer() {
  return '<div class="films-list__container"></div>';
}

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainer();
  }
}
