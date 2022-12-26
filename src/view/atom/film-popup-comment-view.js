import { setHumanizeDateAgoComment } from '../../utils.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFilmPopupComment({ author, emotion, date, comment}) {
  return `
  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${setHumanizeDateAgoComment(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
}

export default class NewFilmPopupCommentView extends AbstractView {
  #comment;

  //CommentsModel(item -> CommentModel)
  constructor(CommentModel) {
    super();
    this.#comment = CommentModel;
  }

  get template() {
    return createFilmPopupComment(this.#comment);
  }
}
