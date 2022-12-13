import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';


const siteBodyElement = document.body;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const popupPresenter = new PopupPresenter(siteBodyElement, filmsModel, commentsModel);
const headerPresenter = new HeaderPresenter(siteHeaderElement);
const mainPagePresenter = new MainPagePresenter(siteMainElement, filmsModel);
const footerPresenter = new FooterPresenter(siteFooterElement);


// popupPresenter.init();
headerPresenter.init();
mainPagePresenter.init();
footerPresenter.init();
