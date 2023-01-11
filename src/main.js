import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import UserModel from './model/user-model.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainFilmsPresenter from './presenter/main-films-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const userModel = new UserModel();

const headerPresenter = new HeaderPresenter(siteHeaderElement, userModel);
const mainFilmsPresenter = new MainFilmsPresenter({
  place: siteMainElement,
  FilmsModel: filmsModel,
  CommentsModel: commentsModel
});
const footerPresenter = new FooterPresenter(siteFooterElement);


headerPresenter.init();
mainFilmsPresenter.init();
footerPresenter.init();
