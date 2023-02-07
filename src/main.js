import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import AppPresenter from './presenter/app-presenter.js';
import CommentsApiService from './service/comments-api-service.js';
import FilmsApiService from './service/films-api-service.js';

const AUTHORIZATION = 'Basic hS2adS44poi1qr2j';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict/';

// const header = document.querySelector('.header');
// const main = document.querySelector('.main');
// const footer = document.querySelector('.footer');

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)
});
const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const appPresenter = new AppPresenter({
  filmsModel,
  commentsModel
});

appPresenter.init();
filmsModel.init();
