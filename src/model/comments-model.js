import { COMMENTS_LIST_LENGTH } from '../utils/const.js';
import { createMockComment } from '../mocks/comments.js';

export default class CommentsModel {
  #comments = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

  get comments() {
    return this.#comments;
  }

}
