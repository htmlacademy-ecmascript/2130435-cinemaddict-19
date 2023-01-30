import AbstractView from '../../../framework/view/abstract-view.js';
import { TitleEmptyList } from '../../../utils/const.js';

function createSectionFilmsListEmpty(currentFilterType) {
  return `
  <section class="films-list">
    <h2 class="films-list__title">${TitleEmptyList[currentFilterType]}</h2>
  </section>`;
}

export default class SectionFilmsListEmptyView extends AbstractView {
  #currentFilterType;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType.toUpperCase();
  }

  get template() {
    return createSectionFilmsListEmpty(this.#currentFilterType);
  }
}
