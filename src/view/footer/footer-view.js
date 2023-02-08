import AbstractView from '../../framework/view/abstract-view';

function createFooter(films) {
  return `
  <section class="footer__statistics">
    <p>${films} movies inside</p>
  </section>`;
}

export default class FooterView extends AbstractView {
  #filmsCounter = 0;

  constructor({allFilmsCounter}) {
    super();
    this.#filmsCounter = allFilmsCounter;
  }

  get template() {
    return createFooter(this.#filmsCounter);
  }
}
