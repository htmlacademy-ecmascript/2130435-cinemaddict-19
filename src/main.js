import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';

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
