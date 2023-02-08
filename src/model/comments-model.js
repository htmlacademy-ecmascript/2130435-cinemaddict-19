import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiService;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  set comments(newComments) {
    this.#comments = newComments;
  }

  async getComments(updateType, film) {
    try {
      this.comments = await this.#commentsApiService.getComments(film);
      this._notify(updateType, this.comments);
    } catch (err) {
      this.comments = [];
    }
  }

  async addComment(updateType, comment, film) {
    try {
      const response = await this.#commentsApiService.addComment(film, comment);
      film.comments = response.movie.comments;
      await this.getComments(updateType, film);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, comment, film) {
    try {
      await this.#commentsApiService.deleteComment(comment);
      this.#deleteCommentFilm(film, comment);
      await this.getComments(updateType, film);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #deleteCommentFilm(film, comment) {
    const indexFilm = film.comments.findIndex((id) => id === comment.id);
    film.comments = [
      ...film.comments.slice(0, indexFilm),
      ...film.comments.slice(indexFilm + 1)
    ];
  }

}
