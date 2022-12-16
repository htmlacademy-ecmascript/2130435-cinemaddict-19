import { getMockUser } from '../mocks/user.js';

export default class UserModel {
  #user = getMockUser();

  get user() {
    return this.#user;
  }
}

