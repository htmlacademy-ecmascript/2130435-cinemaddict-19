import AbstractView from '../../../framework/view/abstract-view.js';
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

function createFilmDetailsBottomContainer(comments) {
  return `
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${comments.map(createCommentItem).join('')}
      </ul>

      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojiNameList.map(createEmojiItem).join('')}
        </div>
      </form>
    </section>
  </div>`;
}

export default class FilmDetailsBottomContainerView extends AbstractView {
  #comments;

  constructor({currentFilmCommentsModel}) {
    super();
    this.#comments = currentFilmCommentsModel;
  }

  get template() {
    return createFilmDetailsBottomContainer(this.#comments);
  }
}
