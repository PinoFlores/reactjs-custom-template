import _ from 'lodash';

export const like = input => new RegExp(input.trim(), 'i');

export const applyDataFilters = (filters = {}, data = [], callback) => {
  let final = data;

  _.keys(filters).forEach(name => {
    const value = filters[name];
    if (value) {
      final = final.filter(item => like(value).test(item[name]));
    } else final = data;
  });

  return dispatcherHerper(final, callback);
};

const dispatcherHerper = (data = [], filters = {}, callback) => {
  const final = Array.from(new Set(data));
  if (!final.length && typeof callback === 'function') {
    callback();
    return;
  }
  return data;
};
