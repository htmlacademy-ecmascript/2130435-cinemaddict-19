import AbstractView from '../../framework/view/abstract-view';

function createFooter() {
  return `
  <section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
}

export default class FooterView extends AbstractView {
  get template() {
    return createFooter();
  }
}
