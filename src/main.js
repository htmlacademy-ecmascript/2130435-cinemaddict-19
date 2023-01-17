import FilmsModel from './model/films-model.js';
import MainPresenter from './presenter/main-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const filmsModel = new FilmsModel();

const mainPresenter = new MainPresenter({
  header: header,
  main: main,
  footer: footer,
  filmsModel: filmsModel
});

mainPresenter.init();
