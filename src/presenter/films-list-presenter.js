import { render, remove } from '../framework/render.js';
import FilmsListContainerView from '../view/main-films-list/containers/films-list-container-view.js';
import SectionFilmsListEmptyView from '../view/main-films-list/sections/section-films-list-empty-view.js';
import SectionFilmsListView from '../view/main-films-list/sections/section-films-list-view.js';
import ShowMoreButtonView from '../view/main-films-list/show-more-button-view.js';

const STANDARD_LIST_TITLE = 'All movies. Upcoming';

export default class FilmsListPresenter {
  #place;
  #isExtra;
  #films;
  #listTitle;
  #listFilmsArray;

  #start = 0;
  #step = 5;

  #sectionFilmsListComponent;
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #emptyListComponent = new SectionFilmsListEmptyView();


  /**
   * @param {HTMLElement} place Место добавления объекта управления презентером
   * @param {boolean} isExtra Это экстра раздел?
   * @param {string} listTitle Название раздела
   * @param {collection} filmsCardsPresenter Презентер карточек фильма? Пока не нужен
   */
  constructor({place, isExtra = false, listTitle = STANDARD_LIST_TITLE, filmsCardsPresenter}) {
    this.#place = place; //this.#sectionFilmsComponent.element
    this.#isExtra = isExtra;
    this.#films = filmsCardsPresenter;
    this.#listTitle = listTitle;

    this.#listFilmsArray = [...this.#films.values()];

    this.#sectionFilmsListComponent = new SectionFilmsListView({
      isExtra: this.#isExtra,
      listTitle: this.#listTitle
    });
  }

  #renderCardsInCurrentRange() {
    this.#listFilmsArray.slice(this.#start, this.#start += this.#step).forEach((film) => {
      film.init(this.#filmsListContainerComponent.element);
    });
  }


  init() {
    if (this.#isExtra && !this.#films.size) {
      return;
    } else if (!this.#films.size) {
      render(this.#emptyListComponent, this.#place);
      return;
    }

    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);

    if (this.#isExtra) {
      this.#films.get(1).init(this.#filmsListContainerComponent.element);
      this.#films.get(2).init(this.#filmsListContainerComponent.element);
    } else {
      this.#renderCardsInCurrentRange();
    }

    if (!this.#isExtra) {
      render(this.#showMoreButtonComponent, this.#sectionFilmsListComponent.element);
      this.#showMoreButtonComponent.element.addEventListener('click', () => {
        this.#renderCardsInCurrentRange();
        if (this.#start >= this.#listFilmsArray.length) {
          remove(this.#showMoreButtonComponent);
        }
      });
    }
  }
}
