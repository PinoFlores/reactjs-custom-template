import faker from 'faker';

export const DataFaker = {
  getWithPagination: (size = 100, page = 1, perPage = 10) => {
    const d = [];
    for (let i = 0; i < size; i++) {
      d.push({
        id: i + 1,
        name: faker.name.firstName(),
        address: faker.address.country(),
      });
    }
    const pageData = d.slice((page - 1) * perPage, page * perPage);
    return {
      data: pageData,
      meta: {
        current_page: 1,
        per_page: 20,
        total: size,
      },
    };
  },
  getRaw: (size = 20) => {
    const d = [];
    for (let i = 0; i < size; i++) {
      d.push({
        id: i + 1,
        name: faker.name.firstName(),
        address: faker.address.country(),
      });
    }
    return d;
  },
};
