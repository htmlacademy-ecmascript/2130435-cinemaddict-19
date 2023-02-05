import ApiService from '../framework/api-service.js';

const Url = {
  FILMS: 'movies',
  COMMENTS: 'comments'
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  getComments(film) {
    return this._load({url: `${Url.COMMENTS}/${film.id}`})
      .then(ApiService.parseResponse);
  }

  async addComment(film, comment) {
    const response = await this._load({
      url: `${Url.COMMENTS}/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(comment) {
    const response = await this._load({
      url: `${Url.COMMENTS}/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  }

}
