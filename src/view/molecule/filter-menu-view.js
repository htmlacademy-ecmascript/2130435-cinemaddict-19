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

  constructor(filmsModel) {
    super();
    this.#films = filmsModel;
  }

  #createNavigateItems() {
    const filterFilmMarks = this.#films.getCorrectFilmsMarks();
    const { watchlistCounter, historyCounter, favoritesCounter } = filterFilmMarks;
    return [
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.ALL, '', true),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.WATCH, watchlistCounter),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.HISTORY,historyCounter),
      new NewMainNavigateItemView(NAVIGATE_ITEMS_NAMES.FAVORITE,favoritesCounter)
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
