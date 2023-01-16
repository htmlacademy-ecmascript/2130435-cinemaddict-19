import AbstractView from '../../framework/view/abstract-view.js';

function createShowMoreButton() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButton();
  }
}
