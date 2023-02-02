import he from 'he';
import AbstractStatefulView from '../../../framework/view/abstract-stateful-view.js';
import { setHumanizeDateAgoComment } from '../../../utils/utils.js';

const emojiNameList = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

function createCommentItem(comment) {
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${setHumanizeDateAgoComment(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
}

function createEmojiItem(emoji) {
  return `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`;
}

function createFilmDetailsBottomContainer(comments, {emojiValue, userText}) {
  const commentText = `${userText ? `${userText.trim()}` : ''}`;
  return `
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${comments.map(createCommentItem).join('')}
      </ul>

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
      </form>
    </section>
  </div>`;
}

export default class FilmDetailsBottomContainerView extends AbstractStatefulView {
  #comments;
  #addCommentHandler = null;
  #deleteCommentHandler = null;
  #currentIndex;

  constructor({ comments, handleAddComment, handleCommentsDelete }) {
    super();
    this._setState({
      emojiValue: null,
      userText: null
    });
    this.#comments = comments;
    this.#addCommentHandler = handleAddComment;
    this.#deleteCommentHandler = handleCommentsDelete;

    this._restoreHandlers();
  }

  #enterCtrlKeyDownHandler = (evt) => {
    if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      this.#parseStateToComment(this._state);
      this.updateElement(this._state);
    }
  };

  #inputChangeHandler = (evt) => {
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

  #getCurrentIndex = (evt) => {
    this.#currentIndex = [...evt.currentTarget.parentElement.children].indexOf(evt.currentTarget);
    if (evt.target.closest('.film-details__comment-delete')) {
      this.#deleteCommentHandler(this.#comments[this.#currentIndex]);
    }
  };

  #parseStateToComment = (state) => {
    try {
      if (!state.emojiValue) {
        throw new Error('Not selected emoji smile');
      }
      this.#addCommentHandler({
        author: 'Unknown',
        comment: state.userText,
        date: Date.now(),
        emotion: state.emojiValue,
      });
    } catch (err) {
      return err.message;
    }
  };

  _restoreHandlers() {
    this.element.querySelectorAll('.film-details__comment').forEach((deleteButton) => {
      deleteButton.addEventListener('click', this.#getCurrentIndex);
    });

    this.element.querySelector('.film-details__comment-input').
      addEventListener('input', this.#textareaInputHandler);
    this.element.querySelector('.film-details__comment-input').
      addEventListener('keydown', this.#enterCtrlKeyDownHandler);

    this.element.querySelector('.film-details__emoji-list').
      addEventListener('change', this.#inputChangeHandler);
  }

  get template() {
    return createFilmDetailsBottomContainer(this.#comments, this._state);
  }
}

