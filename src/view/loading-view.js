import AbstractView from '../framework/view/abstract-view.js';

function createNoFilmsTemplate() {
  return (
    `<p class="board__no-tasks">
      Loading...
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createNoFilmsTemplate();
  }
}
