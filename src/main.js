import { COMMENT, DANCE_LIFE, GREAT_FLAMARION, POPEYE_THE_SAILOR, POPUP_FILM, SAGEBRUSH_TRAIL, THE_MAN } from './mock.js';
import { render } from './render.js';
import NewFilmPopupComment from './view/atom/film-popup-comment.js';
import NewPopupFilmDetailsInfoView from './view/atom/film-popup-info.js';
import NewFooterStatisticsView from './view/atom/footer-statistics.js';
import NewHeaderProfileView from './view/atom/header-profile.js';
import NewFilmPopupCommentsList from './view/molecule/film-popup-comments-list.js';
import NewPopupFilmControlsView from './view/molecule/film-popup-controls.js';
import NewFilterMenuView from './view/molecule/main-navigate.js';
import NewSortListView from './view/molecule/sort-list.js';
import NewFilmCardView from './view/organism/film-card.js';
import NewFilmSection from './view/page/film-section.js';
import NewFilmListView from './view/template/film-list.js';
import NewFilmPopupView from './view/template/film-popup.js';
import NewFilmPopupBottomContainer from './view/wrapper/film-popup-bottom-container.js';
import NewFilmPopupTopContainer from './view/wrapper/film-popup-top-container.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const cardDanceLife = new NewFilmCardView(DANCE_LIFE);

const cardPopeyeTheSailor = new NewFilmCardView(POPEYE_THE_SAILOR);
cardPopeyeTheSailor.setStateControl(false, true, true);

const cardTheMan = new NewFilmCardView(THE_MAN);
cardTheMan.setStateControl(true, true, true);

const cardSagebrushTrail = new NewFilmCardView(SAGEBRUSH_TRAIL);
cardSagebrushTrail.setStateControl(true);

const cardGreatFlamarion = new NewFilmCardView(GREAT_FLAMARION);

const MainList = new NewFilmListView(cardDanceLife, cardPopeyeTheSailor, cardTheMan, cardSagebrushTrail, cardGreatFlamarion);

const TopRated = new NewFilmListView(cardTheMan, cardSagebrushTrail);
TopRated.setModeExtra(true);
TopRated.setTitle('Top Rated', true);
TopRated.setMoreButtonShow(true);

const MostCommented = new NewFilmListView(cardDanceLife, cardPopeyeTheSailor);
MostCommented.setModeExtra(true);
MostCommented.setTitle('Most Commented', true);
MostCommented.setMoreButtonShow(true);

render(new NewHeaderProfileView(), siteHeaderElement);
render(new NewFilterMenuView(), siteMainElement);
render(new NewSortListView(), siteMainElement);

render(new NewFilmSection(MainList, TopRated, MostCommented), siteMainElement);


render(new NewFooterStatisticsView(), siteFooterElement);

// Создание попапа
// Верхняя часть
const popupInfo = new NewPopupFilmDetailsInfoView(POPUP_FILM);
const popupControls = new NewPopupFilmControlsView();
const topPopup = new NewFilmPopupTopContainer(popupControls, popupInfo);

// Нижняя часть
const oneComment = new NewFilmPopupComment(COMMENT);
const twoComment = new NewFilmPopupComment(COMMENT);
const commentList = new NewFilmPopupCommentsList(oneComment, twoComment);
const botPopup = new NewFilmPopupBottomContainer(commentList);

const popup = new NewFilmPopupView(topPopup, botPopup);
render(popup, document.body);
