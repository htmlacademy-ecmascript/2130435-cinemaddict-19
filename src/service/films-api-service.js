import ApiService from '../framework/api-service.js';
import {adaptiveToServer} from '../utils/adaptive';
import { Method, Url } from '../utils/const';


export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: Url.FILMS})
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `${Url.FILMS}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptiveToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }
}
