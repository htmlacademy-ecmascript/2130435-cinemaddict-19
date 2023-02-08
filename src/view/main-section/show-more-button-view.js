import AbstractView from '../../framework/view/abstract-view';

function createShowMoreButton() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class ShowMoreButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  get template() {
    return createShowMoreButton();
  }
}
