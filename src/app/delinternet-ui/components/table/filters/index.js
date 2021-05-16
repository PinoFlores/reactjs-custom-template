import _ from 'lodash';

export const like = input => new RegExp(input.trim(), 'i');

export const applyDataFilters = (filters = {}, data = []) => {
  let final = data;

  _.keys(filters).forEach(name => {
    const value = filters[name];
    if (value) {
      final = final.filter(item => like(value).test(item[name]));
    } else final = data;
  });

  return Array.from(new Set(final));
};
