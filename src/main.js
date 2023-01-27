import CommentsModel from './model/new-comments-model.js';
import FilmsModel from './model/new-films-model.js';
import AppPresenter from './presenter/app-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

// const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

// const mainPresenter = new MainPresenter({
  //   header: header,
  //   main: main,
  //   footer: footer,
  //   filmsModel: filmsModel,
  //   commentsModel: commentsModel
  // });

  // mainPresenter.init();

const filmsModel = new FilmsModel();
const appPresenter = new AppPresenter({
  filmsModel,
  commentsModel
});

appPresenter.init();
