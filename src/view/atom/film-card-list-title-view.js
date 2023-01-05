import AbstractView from '../../framework/view/abstract-view.js';

function createFilmListTitle(title, show) {
  const isHidden = `${show ? '' : ' visually-hidden'}`;
  return `<h2 class="films-list__title${isHidden}">${title}</h2>`;
}

export default class NewFilmCardListTitleView extends AbstractView {

  //title = NewFilmCardListView.#listTitle; show = NewFilmCardListView.#listShowTitle : boolean;
  constructor(title, show){
    super();
    this.title = title;
    this.show = show;
  }

  get template() {
    return createFilmListTitle(this.title, this.show);
  }
}
