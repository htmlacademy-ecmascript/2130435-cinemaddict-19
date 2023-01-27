
const STANDARD_LIST_TITLE = 'All movies. Upcoming';
const START_ELEMENT = 0;
const STEP_LOAD_MORE_FILMS = 5;

/**
 * Абстрактный класс презентера списка фильмов
 */
export default class AbstractFilmsListPresenter {

  #sectionFilmsListComponent;
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;

  #emptyListComponent = new SectionFilmsListEmptyView();

  // this._place = place; //this.#sectionFilmsComponent.element
  constructor({place, isExtra = false, listTitle = STANDARD_LIST_TITLE, filmsCardsPresenters}) {
    if (new.target === AbstractFilmsListPresenter) {
      throw new Error('Can\'t instantiate Abstract class, only concrete one.');
    }
    this.isExtra = isExtra;
    this.listTitle = listTitle;
    this._cardsFilmsPresenters = [...filmsCardsPresenters.values()];

    this.#sectionFilmsListComponent = new SectionFilmsListView({
      isExtra: this.isExtra,
      listTitle: this.listTitle
    });

    if (!this.isExtra) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick
      });
    }
  }

  get isExtra() {
    return this._isExtra;
  }

  set isExtra(type) {
    this._isExtra = type;
  }

  get listTitle() {
    return this._listTitle;
  }

  set listTitle(title) {
    this._listTitle = title;
  }



  #renderCardsInCurrentRange() {
    this.#cardsFilmsPresenters.slice(this.#start, this.#start += this.#step).forEach((film) => {
      film.init(this.#filmsListContainerComponent.element);
    });
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderCardsInCurrentRange();
    if (this.#start >= this.#cardsFilmsPresenters.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  init() {
    if (this.#isExtra && !this.#cardsFilmsPresenters.length) {
      return;
    } else if (!this.#cardsFilmsPresenters.length) {
      render(this.#emptyListComponent, this.#place);
      return;
    }

    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);

    if (this.#isExtra) {
      this.#cardsFilmsPresenters[0].init(this.#filmsListContainerComponent.element);
      this.#cardsFilmsPresenters[1].init(this.#filmsListContainerComponent.element);
    } else {
      this.#renderCardsInCurrentRange();
      render(this.#showMoreButtonComponent, this.#sectionFilmsListComponent.element);
    }
  }
}
