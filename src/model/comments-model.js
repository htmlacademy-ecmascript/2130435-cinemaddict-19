import { COMMENTS_LIST_LENGTH } from '../const.js';
import { createMockComment } from '../mocks/comments.js';

export default class CommentsModel {
  comments = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

  getComments() {
    return this.comments;
  }
}
