import axios from 'axios';
import _ from 'lodash';
import { ObjectHelper } from './ObjectCheckerHelper';
import { TableHelper } from './TableHelper';

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
      this[singleton] = new Request(singletonEnforcer);
    }
    return this[singleton];
  }

  get = (...params) => this.session.get(...params);
  post = (...params) => this.session.post(...params);
  put = (...params) => this.session.put(...params);
  patch = (...params) => this.session.patch(...params);
  delete = (...params) => this.session.delete(...params);
}

export default Request.instance;

/**
 * Given a HttpRequest error parse that response.
 *
 * @param {*} error - request error
 * @returns {Object} - {status: integer, message: string, statusText : string}
 */
export const parseError = error => {
  let response = {
    status: '',
    message: '',
    statusText: '',
  };

  try {
    const { response } = error;
    response.status = response.status;

    if (_.has(response, 'statusText')) {
      response.statusText = response.statusText;
    }

    if (_.has(error, 'data')) {
      if (_.has(response.data, 'message')) {
        response.message = data.message;
      }
    }
  } catch (err) {}

  return response;
};

/**
 * Given a base url and obj containing
 * param, build a query url.
 *
 * @param {*} baseUrl - base Url
 * @param {*} query - obj with all params
 * @returns {string} - url with query string
 */
export const buildQuery = (baseUrl, query = {}) => {
  let url = baseUrl;
  const params = Object.keys(query);

  if (!params.length) return url;

  url = `${url}?`;

  for (let param of params) {
    url = `${url}${param}=${query[param]}&`;
  }

  return url.slice(0, -1);
};

export const parseResponseCollection = (response, page = 1, perPage = 10) => {
  let dataSource = [],
    pagination = {
      total: 0,
      current: page,
      perPage,
    };

  if (_.has(response, 'data') && _.has(response, 'meta')) {
    const { data, meta } = response;
    dataSource = data;
    pagination = ObjectHelper.setIfHas(meta, pagination, 'total');
    pagination = ObjectHelper.setIfHas(
      meta,
      pagination,
      'current_page',
      'current',
    );
    pagination = ObjectHelper.setIfHas(meta, pagination, 'per_page', 'perPage');
  } else {
    dataSource = TableHelper.paginateFromArray(response, page, perPage);
  }

  return {
    data: dataSource,
    pagination,
  };
};

export const parseResponseResource = data => {
  if (_.has(data, 'data') && _.has(data, 'meta')) {
    return data.data;
  }
  return data;
};

const instance = Request.instance;
export const RequestModule = {
  request: instance,
  parseError,
  buildQuery,
  parseResponseCollection,
  parseResponseResource,
};
