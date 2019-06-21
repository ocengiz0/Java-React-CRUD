import users from './users';

export const actions = {
  users: {...users.actions},
};

export const reducers = {
  users: users.reducers
};
