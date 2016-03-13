import {
  Map,
  fromJS,
} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'modules/auth';

import {
  CREATE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_SUCCESS
} from './action-types';

export const initialState = {
  deleted: null,
  list: new Map(),
  previous: []
};

export function tripReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITY_SUCCESS:
      // let list;

      // if (state.deleted && state.deleted.key === action.payload.key) {
      //   list = [ ...state.previous ];
      // }
      // else {
      //   list = [ action.payload, ...state.list ];
      // // }
      // if (!state.list[tripId]){
      //   state.list[tripId] = new Map();
      // }

      return {
        deleted: null,
        list: state.list.mergeDeep(action.payload),
        previous: [],
      };

    case DELETE_ACTIVITY_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.deleteIn([action.tripId, 'entities', 'trips', action.activityId]),
        previous: [ ...state.list ]
      };

    case UPDATE_ACTIVITY_SUCCESS:
      return {
        deleted: null,
        list: state.list.mergeDeep(action.payload),
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
