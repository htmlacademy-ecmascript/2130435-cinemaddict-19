import MainPresenter from './presenter/main-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const mainPresenter = new MainPresenter({
  header: header,
  main: main,
  footer: footer
});

mainPresenter.init();
