import { DANCE_LIFE, GREAT_FLAMARION, POPEYE_THE_SAILOR, SAGEBRUSH_TRAIL, THE_MAN } from '../mock.js';
import { render } from '../render.js';
import NewFilterMenuView from '../view/molecule/main-navigate.js';
import NewSortListView from '../view/molecule/sort-list.js';
import NewFilmCardView from '../view/organism/film-card.js';
import NewFilmSection from '../view/page/film-section.js';
import NewFilmListView from '../view/template/film-list.js';

const FilmList = {
  MAIN_LIST: [
    DANCE_LIFE,
    POPEYE_THE_SAILOR,
    THE_MAN,
    SAGEBRUSH_TRAIL,
    GREAT_FLAMARION
  ],
  TOP_RATED_LIST: [THE_MAN, SAGEBRUSH_TRAIL],
  COMMENTED_LIST: [DANCE_LIFE, POPEYE_THE_SAILOR]
};

export default class MainPagePresenter {
  cardDanceLifeComponent = new NewFilmCardView(DANCE_LIFE);
  cardPopeyeTheSailorComponent = new NewFilmCardView (POPEYE_THE_SAILOR);
  cardTheManComponent = new NewFilmCardView(THE_MAN);
  cardSagebrushTrailComponent = new NewFilmCardView(SAGEBRUSH_TRAIL);
  cardGreatFlamarionComponent = new NewFilmCardView(GREAT_FLAMARION);
  mainListComponent = new NewFilmListView(this.cardDanceLifeComponent, this.cardPopeyeTheSailorComponent, this.cardTheManComponent, this.cardSagebrushTrailComponent, this.cardGreatFlamarionComponent);
  topRatedComponent = new NewFilmListView(this.cardTheManComponent, this.cardSagebrushTrailComponent);
  mostCommentedComponent = new NewFilmListView(this.cardDanceLifeComponent, this.cardPopeyeTheSailorComponent);

  constructor({boardContainer}, mainFilmListModel, topRatedFilmList, mostCommentedFilmList) {
    this.boardContainer = boardContainer;
    this.mainList = [THE_MAN, SAGEBRUSH_TRAIL];
    this.topRatedList = [THE_MAN];
    this.commentedList = mostCommentedFilmList;
  }

  init() {
    const filmCardsComponents = this.mainList.map((film) => new NewFilmCardView(film));
    const topRatedComponents = this.topRatedList.forEach((film) => {
      const result = filmCardsComponents.find((component) => component.CardFilmModel.title.include(film.CardFilmModel.title));
      if (result) {
        return result;
      }
    });
    console.log(topRatedComponents)
    const mainListComponent = new NewFilmListView(...filmCardsComponents);
    this.topRatedComponent.setModeExtra(true);
    this.topRatedComponent.setTitle('Top Rated', true);
    this.topRatedComponent.setMoreButtonShow(true);
    this.mostCommentedComponent.setModeExtra(true);
    this.mostCommentedComponent.setTitle('Most Commented', true);
    this.mostCommentedComponent.setMoreButtonShow(true);
    render(new NewFilterMenuView(), this.boardContainer);
    render(new NewSortListView(), this.boardContainer);
    render(new NewFilmSection(this.mainListComponent, this.topRatedComponent, this.mostCommentedComponent), this.boardContainer);
  }
}
