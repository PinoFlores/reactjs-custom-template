import { UserTypes } from 'store/types/UserTypes';
import { applyDataFilters } from 'app/delinternet-ui/helpers/dataFilter';

const usersAux = [
  {
    name: 'Jose',
    lastname: 'Aburto',
    email: 'jose@gmail.com',
  },
  {
    name: 'Jeremias',
    lastname: 'Aburto',
    email: 'jeremias.aburto@gmail.com',
  },
  {
    name: 'Juan',
    lastname: 'Aburto',
    email: 'jeremias.aburto@gmail.com',
  },
];

const intialState = {
  users_backup: usersAux,
  users: usersAux,
};

export const UserReducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.FILTER_USERS:
      const { users_backup } = state;
      return {
        ...state,
        users: applyDataFilters(payload, users_backup, helper),
      };
    case UserTypes.GET_ALL:
      return { ...state };
    default:
      return { ...state };
  }
};

const helper = (prop, value) => {
  console.log(`Requesting from server: /users?[${prop}]=${value}`);
};
