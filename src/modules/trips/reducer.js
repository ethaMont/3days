import {
  Map,
  fromJS,
} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'modules/auth';

import {
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS
} from './action-types';


export const initialState = {
  deleted: null,
  list: new Map(),
  previous: []
};


export function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRIP_SUCCESS:
      return {
        deleted: null,
        list: state.list.mergeDeep(action.payload.entities.trips),
        previous: [],
      };

    case DELETE_TRIP_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.delete(Object.keys(action.payload.entities.trips)[0]),
        previous: [ ...state.list ]
      };

    case UPDATE_TRIP_SUCCESS:
      return {
        deleted: null,
        list: state.list.mergeDeep(action.payload.entities.trips),
        previous: []
      };

    case SIGN_OUT_SUCCESS:
      return {
        deleted: null,
        list: [],
        previous: []
      };

    default:
      return state;
  }
}
