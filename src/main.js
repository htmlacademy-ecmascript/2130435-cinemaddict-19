import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import AppPresenter from './presenter/app-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel();

const appPresenter = new AppPresenter({
  filmsModel,
  commentsModel
});

appPresenter.init();
