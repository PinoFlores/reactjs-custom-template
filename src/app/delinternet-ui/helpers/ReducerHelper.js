const handleOnSave = (state, item) => {
  const { all } = state;
  all.push(item);
  return { ...state, all, selected: item };
};

const handleOnUpdate = (state, predicate, item) => {
  const { all } = state;
  let needed = all.find(predicate);
  needed = { ...needed, item };
  all.push(needed);
  return { ...state, all, selected: needed };
};

const handleOnDelete = (state, predicate) => {
  const { all } = state;
  const aux = all.filter(!predicate);
  return { ...state, all: aux };
};

const getItemIfExistsOrRequestIt = (state, predicate, callback) => {
  const { all } = state;
  const needed = all.find(predicate);
  if (needed) return { ...state, selected: needed };
  callback();
  return { ...state };
};

const like = input => new RegExp(input.trim(), 'i');

const handleOnFilter = (state, filters = {}, callback) => {
  const { all, backup } = state;
  const filterKeys = Object.keys(filters);

  if (!filterKeys) return { ...state, all: backup };

  let filtereds = all;

  for (let filterName of filterKeys) {
    const filterValue = filters[filterName];
    if (filterValue) {
      filtereds = filtereds.filter(item =>
        like(filterValue).test(item[filterName]),
      );
    } else {
      filtereds = backup;
    }
  }

  if (!filtereds.length) {
    callback(filters); // If no data on local, make sure these resource are in server
  }

  return { ...state, all: filtereds };
};

// ! If needed page dont exists, callback will request the server, but
// ! this function (handleOnLocalPageReq) must be call again to end the
// ! request and finish the action call.
const handleOnLocalPageReq = (state, page = 1, perPage, callback) => {
  const { all } = state;

  const neededPage = all.find(page => page.pagination.current == page);

  if (!neededPage) {
    setTimeout(() => callback({ page, perPage }), 10);
    return {
      ...state,
      isLoading: { show: true, message: 'Commons.Loaders.RequestingPage' },
    };
  }

  return {
    ...state,
    currentPage: neededPage,
    isLoading: { show: false, message: '' },
  };
};

export const ReducerHelper = {
  /**
   * Handle a state updation on save action.
   *
   * @param {*} state model state from reducer.
   * @param {*} key model name, any u want from state.
   * @param {*} item item from list to apply changes
   * @returns {Object} new state.
   */
  handleOnSave,
  handleOnUpdate,
  handleOnDelete,
  handleOnDelete,
  getItemIfExistsOrRequestIt,
  handleOnFilter,
  handleOnLocalPageReq,
};
