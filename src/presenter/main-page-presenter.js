import { render } from '../render.js';
import NewFilterMenuView from '../view/molecule/filter-menu-view.js';
import NewSortListView from '../view/molecule/sort-list-view.js';
import NewFilmSectionView from '../view/page/film-section-view.js';
import NewFilmCardListView from '../view/template/film-card-list-view.js';

const ModsExtraTitles = {
  RATED: 'Top Rated',
  COMMENTED: 'Most Commented'
};

export default class MainPagePresenter {
  #place;
  #mainList;
  #topRatedList;
  #commentedList;

  constructor(place, FilmsModel) {
    this.#place = place;
    this.#mainList = FilmsModel.films;
    this.#topRatedList = FilmsModel.twoFilms;
    this.#commentedList = FilmsModel.twoFilms;
  }

  #getFoundedFilmListComponent(searchList, searchLocation) {
    return searchList.map(
      (film) => {
        const foundedFilm = searchLocation.find(
          (component) => component.film_info.title.includes(film.film_info.title)
        );
        if (foundedFilm) {
          return foundedFilm;
        }
      });
  }

  #setModeExtra(component, title) {
    component.modeExtra = true;
    component.setTitle(title, true);
    component.buttonShow = true;
  }

  init() {
    const mainListComponent = new NewFilmCardListView(...this.#mainList);
    const topRatedComponents = this.#getFoundedFilmListComponent(this.#topRatedList, this.#mainList);
    const mostCommentedComponents = this.#getFoundedFilmListComponent(this.#commentedList, this.#mainList);

    const topRatedListComponent = new NewFilmCardListView(...topRatedComponents);
    this.#setModeExtra(topRatedListComponent, ModsExtraTitles.RATED);

    const mostCommentedListComponent = new NewFilmCardListView(...mostCommentedComponents);
    this.#setModeExtra(mostCommentedListComponent, ModsExtraTitles.COMMENTED);

    render(new NewFilterMenuView(), this.#place);
    render(new NewSortListView(), this.#place);
    render(new NewFilmSectionView(mainListComponent, topRatedListComponent, mostCommentedListComponent), this.#place);
  }
}
