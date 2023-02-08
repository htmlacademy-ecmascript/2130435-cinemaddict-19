import AbstractView from '../../../framework/view/abstract-view';

function createSectionFilmsList(isExtra, listTitle) {
  return `
  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${listTitle}</h2>
  </section>`;
}

export default class SectionFilmsListView extends AbstractView {
  #isExtra;
  #listTitle;

  constructor({isExtra, listTitle}) {
    super();
    this.#isExtra = isExtra;
    this.#listTitle = listTitle;
  }

  get template() {
    return createSectionFilmsList(this.#isExtra, this.#listTitle);
  }
}
