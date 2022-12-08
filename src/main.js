import { COMMENT, DANCE_LIFE, GREAT_FLAMARION, POPEYE_THE_SAILOR, POPUP_FILM, SAGEBRUSH_TRAIL, THE_MAN } from './mock.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
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


const siteBodyElement = document.body;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const popupPresenter = new PopupPresenter({ boardContainer: siteBodyElement });
const headerPresenter = new HeaderPresenter({ boardContainer: siteHeaderElement });
const mainPagePresenter = new MainPagePresenter({ boardContainer: siteMainElement });
const footerPresenter = new FooterPresenter({ boardContainer: siteFooterElement });

popupPresenter.init();
headerPresenter.init();
mainPagePresenter.init();
footerPresenter.init();
