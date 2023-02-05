import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import he from 'he';

const emojiNameList = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

function createEmojiItem(emoji) {
  return `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`;
}

function createForm({emojiValue, userText}) {
  const commentText = `${userText ? `${userText.trim()}` : ''}`;
  return `
    <form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">
        ${emojiValue ? `<img src="images/emoji/${emojiValue}.png" width="55" height="55" alt="emoji-smile">` : '' }
      </div>
      <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
      </label>
      <div class="film-details__emoji-list">
          ${emojiNameList.map(createEmojiItem).join('')}
      </div>
    </form>`
}

export default class FormCommentView extends AbstractStatefulView {
  #addCommentHandler = null;

  constructor({ onCommentAdd }) {
    super();
    this.#addCommentHandler = onCommentAdd;
    this._setState({
      userText: null,
      emojiValue: null
    })

    this._restoreHandlers()
  }

  #enterCtrlKeyDownHandler = (evt) => {
    if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      this.#parseStateToComment(this._state);
    }
  };

  #radioChangeHandler = (evt) => {
    this.updateElement({
      emojiValue: evt.target.value
    });
  };

  #textareaInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      userText: he.encode(evt.target.value)
    });
  };

  #parseStateToComment = (state) => {
    this.#addCommentHandler({
      comment: state.userText,
      emotion: state.emojiValue,
    });
  };

  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-input').
      addEventListener('keydown', this.#enterCtrlKeyDownHandler)
    this.element.querySelector('.film-details__comment-input').
    addEventListener('input', this.#textareaInputHandler);
    this.element.querySelector('.film-details__emoji-list').
    addEventListener('change', this.#radioChangeHandler);
  }

  get template() {
    return createForm(this._state)
  }

}
