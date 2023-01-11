import { render } from '../framework/render.js';
import NewFilterMenuView from '../view/molecule/filter-menu-view.js';
import NewSortListView from '../view/molecule/sort-list-view.js';
import NewFilmSectionView from '../view/page/film-section-view.js';
import NewFilmCardListView from '../view/template/film-card-list-view.js';

const FIRST_RANK = 0;
const SECOND_RANK = 2;

const ModsExtraTitles = {
  RATED: 'Top Rated',
  COMMENTED: 'Most Commented'
};

export default class MainPagePresenter {
  #place;
  #mainList;
  #topRatedList;
  #commentedList;
  #FilmsModel;

  constructor(place, FilmsModel) {
    this.#place = place;
    this.#FilmsModel = FilmsModel;
    this.#mainList = FilmsModel.films;
    this.#topRatedList = FilmsModel.topRated;
    this.#commentedList = FilmsModel.mostCommented;
  }

  #setModeExtra(component, title) {
    component.modeExtra = true;
    component.setTitle(title, true);
    component.buttonShow = true;
  }

  init() {
    render(new NewFilterMenuView(this.#FilmsModel), this.#place);
    render(new NewSortListView(), this.#place);

    if (!this.#FilmsModel.films.length) {
      const mainListComponent = new NewFilmCardListView(...this.#mainList);
      render(new NewFilmSectionView(mainListComponent), this.#place);
    } else {
      const mainListComponent = new NewFilmCardListView(...this.#mainList);

      const topRatedListComponent = new NewFilmCardListView(...this.#topRatedList.slice(FIRST_RANK, SECOND_RANK));
      this.#setModeExtra(topRatedListComponent, ModsExtraTitles.RATED);

      const mostCommentedListComponent = new NewFilmCardListView(...this.#commentedList.slice(FIRST_RANK, SECOND_RANK));
      this.#setModeExtra(mostCommentedListComponent, ModsExtraTitles.COMMENTED);

      render(new NewFilmSectionView(mainListComponent, topRatedListComponent, mostCommentedListComponent), this.#place);
      mainListComponent.onShowButtonClick();
    }
  }
  //
}
