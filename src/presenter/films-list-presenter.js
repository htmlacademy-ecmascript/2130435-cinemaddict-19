import { render } from '../framework/render.js';
import FilmsListContainerView from '../view/main-films-list/containers/films-list-container-view.js';
import SectionFilmsListView from '../view/main-films-list/sections/section-films-list-view.js';
import ShowMoreButtonView from '../view/main-films-list/show-more-button-view.js';

const STANDARD_LIST_TITLE = 'All movies. Upcoming';

export default class FilmsListPresenter {
  #place;
  #isExtra;
  #films;
  #listTitle;

  #sectionFilmsListComponent;
  #filmsListContainerComponent = new FilmsListContainerView();

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

    this.#sectionFilmsListComponent = new SectionFilmsListView({
      isExtra: this.#isExtra,
      listTitle: this.#listTitle
    });
  }

  init() {
    render(this.#sectionFilmsListComponent, this.#place);
    render(this.#filmsListContainerComponent, this.#sectionFilmsListComponent.element);

    if (this.#isExtra) {
      this.#films.get(1).init(this.#filmsListContainerComponent.element);
      this.#films.get(2).init(this.#filmsListContainerComponent.element);
    } else {
      this.#films.forEach((film) => {
        film.init(this.#filmsListContainerComponent.element);
      });
    }

    if (!this.#isExtra) {
      const showMoreButton = new ShowMoreButtonView();
      render(showMoreButton, this.#sectionFilmsListComponent.element);
    }
  }
}
