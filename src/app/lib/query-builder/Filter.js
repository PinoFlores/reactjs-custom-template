import Query from './Query';

/**
 * This class is like a sql filter, but search taking a obj like item.
 */
export class LikeFilter {
  static filter(dataSet = [], filter = { field: '', value: '' }) {
    return dataSet.filter(record => LikeFilter.whereLike(record, filter));
  }

  static whereLike(record = {}, filter = { field: '', value: '' }) {
    const expected = filter.value;
    const given = record[filter.field];
    return LikeFilter.matchHelper(expected).test(given);
  }

  static matchHelper(value) {
    return new RegExp(value, 'i');
  }
}

export class ExactFilter {
  static filter(dataSet = [], filter = { field: '', value: '' }) {
    return dataSet.filter(record => record[filter.field] == filter.value);
  }
}

// FILTERS TYPES

/**
 * Make all data filtering locally.
 */
class RequestType {
  static get local() {
    return 'LOCAL';
  }
  static get remote() {
    return 'REMOTE';
  }
}

class FilterType {
  static get like() {
    return 'LIKE';
  }
  static get exact() {
    return 'EXACT';
  }
}

export class LocalFilter {
  constructor(dataSet = []) {
    this.dataBackUp = dataSet;
    this.data = dataSet;
  }

  filter(field, value, type = FilterType.like) {
    let result = [];

    if (!this._containsField(field)) {
      throw new Error(`There's any field called ${field} in dataSet records.`);
    }

    switch (type) {
      case FilterType.exact:
        result = ExactFilter.filter(this.data, { field, value });
        break;
      default:
        result = LikeFilter.filter(this.data, { field, value });
        break;
    }
  }

  reset() {
    this.data = this.dataBackUp;
  }

  _containsField(field) {
    if (!this.data.length || !Object.keys(this.data[0]).includes(field))
      return false; // decorate this later with some static fields (pagination)
    return true;
  }
}

// TODO provide some inputs listener handlers to just plug in and plug out.

export default class Filter {
  constructor(options = {}) {
    if (!Object.keys(options).includes('baseUrl')) {
      throw new Error('Base Url Is Need to build this instance!');
    }

    this.baseUrlAux = options.baseUlr || null;
    this.baseUrl = options.baseUlr || null;
    this.apiFilter = {};
    this.localFilters = {};
    this.apiWasRequest = false;
    this.subscriber = [];
    this.queryBuilder = this._getQueryBuilder(this.baseUrl);

    this.filterTypeFlat = FilterType.remote;
  }

  addSubscriber(callback) {
    this.listeners.push(callback);
  }

  addLocalFilter(name, value) {
    if (Object.keys(this.apiFilter) == 0) {
      this.apiFilter[name] = value;
    } else {
      this.localFilters[name] = value;
    }
  }

  reset() {
    this.apiFilter = {};
    this.addLocalFilter = {};
    this.baseUrl = this.baseUrlAux;
    this.queryBuilder = this._getQueryBuilder(this.baseUrl);
    this.subscriber.forEach(subscriber => subscriber(this.queryBuilder.url));
  }

  _getQueryBuilder(baseUrl) {
    return new Query({
      base_url: baseUrl,
    });
  }

  /**
   * Verify if is need to request the server or not.
   * If need will mark the query as to request the server
   * if not, will mark to request local data.
   *
   */
  _getQueryType() {}
}
