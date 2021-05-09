import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export class Request {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton!');
    }

    this.session = axios;

    this.session.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 401:
            case 419:
            case 503:
              //   window.location.href = window.location.origin + '/login';
              localStorage.removeItem('token');
              return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    this.session.interceptors.request.use(
      request => {
        const authH = `Bearer ${localStorage.getItem('token')}`;
        request.headers['Authorization'] = authH;
        request.headers['Content-Type'] = `application/json`;
        return request;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }
    return this[singleton];
  }

  get = (...params) => this.session.get(...params);
  post = (...params) => this.session.post(...params);
  put = (...params) => this.session.put(...params);
  patch = (...params) => this.session.patch(...params);
  delete = (...params) => this.session.delete(...params);
}

export default ApiService.instance;
