import { DANCE_LIFE, GREAT_FLAMARION, POPEYE_THE_SAILOR, SAGEBRUSH_TRAIL, THE_MAN } from '../mock.js';
import { render } from '../render.js';
import NewFilterMenuView from '../view/molecule/main-navigate.js';
import NewSortListView from '../view/molecule/sort-list.js';
import NewFilmCardView from '../view/organism/film-card.js';
import NewFilmSection from '../view/page/film-section.js';
import NewFilmListView from '../view/template/film-list.js';

export default class MainPagePresenter {
  cardDanceLifeComponent = new NewFilmCardView(DANCE_LIFE);
  cardPopeyeTheSailorComponent = new NewFilmCardView (POPEYE_THE_SAILOR);
  cardTheManComponent = new NewFilmCardView(THE_MAN);
  cardSagebrushTrailComponent = new NewFilmCardView(SAGEBRUSH_TRAIL);
  cardGreatFlamarionComponent = new NewFilmCardView(GREAT_FLAMARION);
  mainListComponent = new NewFilmListView(this.cardDanceLifeComponent, this.cardPopeyeTheSailorComponent, this.cardTheManComponent, this.cardSagebrushTrailComponent, this.cardGreatFlamarionComponent);
  topRatedComponent = new NewFilmListView(this.cardTheManComponent, this.cardSagebrushTrailComponent);
  mostCommentedComponent = new NewFilmListView(this.cardDanceLifeComponent, this.cardPopeyeTheSailorComponent);

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
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
