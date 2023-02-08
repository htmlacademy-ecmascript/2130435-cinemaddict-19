import AbstractView from '../../../framework/view/abstract-view';

function createBottomContainer() {
  return '<div class="film-details__bottom-container"></div>';
}

export default class BottomContainerView extends AbstractView {
  get template() {
    return createBottomContainer();
  }
}
