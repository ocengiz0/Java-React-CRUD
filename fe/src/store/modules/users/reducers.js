import * as types from './action-types';
import state from './state';

let initialState = state;

export default (state = initialState, action) => {
  let _obj;
  switch(action.type) {
    case types.SET_USER_DATA:
      _obj = state;
      _obj = action.payload.data;
      return {
        ..._obj
      };
    case types.ADD_USER_DATA:
      _obj = state;
      _obj = action.payload.data;
      return {
        ..._obj
      };
    default:
      return state;
  }
}
