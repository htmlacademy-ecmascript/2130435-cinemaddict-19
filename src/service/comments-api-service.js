import ApiService from '../framework/api-service.js';
import {adaptiveToServer} from '../utils/adaptive';
import { Method, Url } from '../utils/const';

export default class CommentsApiService extends ApiService {
  getComments(film) {
    return this._load({url: `${Url.COMMENTS}/${film.id}`})
      .then(ApiService.parseResponse);
  }

  async addComment(film, comment) {
    const response = await this._load({
      url: `${Url.COMMENTS}/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(adaptiveToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async deleteComment(comment) {
    return await this._load({
      url: `${Url.COMMENTS}/${comment.id}`,
      method: Method.DELETE,
    });
  }

}
