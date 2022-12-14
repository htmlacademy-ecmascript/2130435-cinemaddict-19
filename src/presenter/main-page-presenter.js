import { render } from '../render.js';
import NewFilterMenuView from '../view/molecule/filter-menu-view.js';
import NewSortListView from '../view/molecule/sort-list-view.js';
import NewFilmSectionView from '../view/page/film-section-view.js';
import NewFilmCardListView from '../view/template/film-card-list-view.js';

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

  init() {
    const topRatedComponents = this.#getFoundedFilmListComponent(this.#topRatedList, this.#mainList);
    const mostCommentedComponents = this.#getFoundedFilmListComponent(this.#commentedList, this.#mainList);
    const mainListComponent = new NewFilmCardListView(...this.#mainList);

    const topRatedListComponent = new NewFilmCardListView(...topRatedComponents);
    topRatedListComponent.modeExtra = true;
    topRatedListComponent.setTitle('Top Rated', true);
    topRatedListComponent.buttonShow = true;

    const mostCommentedListComponent = new NewFilmCardListView(...mostCommentedComponents);
    mostCommentedListComponent.modeExtra = true;
    mostCommentedListComponent.setTitle('Most Commented', true);
    mostCommentedListComponent.buttonShow = true;

    render(new NewFilterMenuView(), this.#place);
    render(new NewSortListView(), this.#place);
    render(new NewFilmSectionView(mainListComponent, topRatedListComponent, mostCommentedListComponent), this.#place);
  }
}
