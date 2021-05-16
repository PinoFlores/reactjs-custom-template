export const TableHelper = {
  paginateFromArray: (array, page, perPage) => {
    return array.slice((page - 1) * perPage, page * perPage);
  },
};
