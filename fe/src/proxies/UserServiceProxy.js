import { Proxy } from './Proxy';
const USER_API_URL = 'http://localhost:8080'

export class UserServiceProxy extends Proxy {
  constructor() {
    super(`${USER_API_URL}`);
  }

  getUserList() {
    return this.submit('get', `/users`);
  }

  getUser(id) {
    return this.submit('get', `/users/${id}`);
  }

  deleteUser(id) {
    return this.submit('delete', `/users/${id}`);
  }

  updateUser(id, user) {
    return this.submit('put', `/users/${id}`, user);
  }

  addUser(user) {
    return this.submit('post', `/users/`, user);
  }
};
