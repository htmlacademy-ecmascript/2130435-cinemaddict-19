import { createElement, render } from '../../framework/render.js';
import NewMainNavigateItemView from '../atom/main-navigation-item-view.js';
import AbstractView from '../../framework/view/abstract-view.js';

const NAVIGATE_ITEMS_NAMES = {
  ALL: 'All movies',
  WATCH: 'Watchlist',
  HISTORY: 'History',
  FAVORITE: 'Favorites'
};

function createMainNavigate() {
  return '<nav class="main-navigation"></nav>';
}

export default class NewFilterMenuView extends AbstractView {
  #element = null;
  #films;
  #watchlistCounter = 0;
  #historyCounter = 0;
  #favoritesCounter = 0;

  constructor(filmsModel) {
    super();
    this.#films = filmsModel.films;
  }

  #calculateCorrectFilmsMarks() {
    this.#films.forEach(({user_details: userDetails }) => {
      const { watchlist, already_watched: history, favorite } = userDetails;
      if (watchlist) {
        this.#watchlistCounter++;
      }
      if (history) {
        this.#historyCounter++;
      }
      if (favorite) {
        this.#favoritesCounter++;
      }
    });
  }

  #createNavigateItems() {
    this.#calculateCorrectFilmsMarks();
    return [
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.ALL, '', true),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.WATCH, this.#watchlistCounter),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.HISTORY,this.#historyCounter),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.FAVORITE,this.#favoritesCounter)
    ];
  }

  get template() {
    return createMainNavigate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      const buttons = this.#createNavigateItems();
      buttons.forEach((button) => render(button, this.#element));
    }
    return this.#element;
  }
}
