import _ from 'lodash';

export const ObjectHelper = {
  contains: function (obj = {}, property) {
    return Object.keys(obj).includes(property);
  },
  empty: function (obj = {}) {
    return Object.keys(obj) === 0;
  },

  getPropertyOrDefault: function (obj = {}, property, defaultValue) {
    return this.contains(obj, property) ? obj[property] : defaultValue;
  },

  getPropertyAsArray: function (obj = {}) {
    return Object.keys(obj);
  },
  setIfHas: function (from, to, needProp = '', propAs = null) {
    if (_.has(from, needProp)) {
      to[propAs ? propAs : needProp] = from[needProp];
    }
    return to;
  },
};
