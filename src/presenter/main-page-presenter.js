import { render } from '../render.js';
import NewFilterMenuView from '../view/molecule/filter-menu-view.js';
import NewSortListView from '../view/molecule/sort-list-view.js';
import NewFilmCardView from '../view/organism/film-card-view.js';
import NewFilmSectionView from '../view/page/film-section-view.js';
import NewFilmListView from '../view/template/film-list-view.js';

export default class MainPagePresenter {
  constructor({boardContainer}, {MAIN_LIST, TOP_RATED_LIST, COMMENTED_LIST}) {
    this.boardContainer = boardContainer;
    this.mainList = MAIN_LIST;
    this.topRatedList = TOP_RATED_LIST;
    this.commentedList = COMMENTED_LIST;
  }

  getListFilmComponent() {
    return this.mainList.map((film) => new NewFilmCardView(film));
  }

  getFoundedFilmListComponent(searchList, searchLocation) {
    return searchList.map((film) => {
      const foundedFilm = searchLocation.find((component) => component.CardFilmModel.title.includes(film.title));
      if (foundedFilm) {
        return foundedFilm;
      }
    });
  }

  init() {
    const filmCardsComponents = this.getListFilmComponent();
    const topRatedComponents = this.getFoundedFilmListComponent(this.topRatedList, filmCardsComponents);
    const mostCommentedComponents = this.getFoundedFilmListComponent(this.commentedList, filmCardsComponents);
    const mainListComponent = new NewFilmListView(...filmCardsComponents);
    const topRatedListComponent = new NewFilmListView(...topRatedComponents);
    topRatedListComponent.setModeExtra(true);
    topRatedListComponent.setTitle('Top Rated', true);
    topRatedListComponent.setMoreButtonShow(true);
    const mostCommentedListComponent = new NewFilmListView(...mostCommentedComponents);
    mostCommentedListComponent.setModeExtra(true);
    mostCommentedListComponent.setTitle('Most Commented', true);
    mostCommentedListComponent.setMoreButtonShow(true);
    render(new NewFilterMenuView(), this.boardContainer);
    render(new NewSortListView(), this.boardContainer);
    render(new NewFilmSectionView(mainListComponent, topRatedListComponent, mostCommentedListComponent), this.boardContainer);
  }
}
