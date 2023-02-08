import AbstractView from '../../../framework/view/abstract-view';

function createSectionFilmDetails() {
  return '<section class="film-details"></section>';
}

export default class SectionFilmDetailsView extends AbstractView {
  get template() {
    return createSectionFilmDetails();
  }
}
