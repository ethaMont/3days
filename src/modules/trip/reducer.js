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
  list: [],
  previous: []
};


export function tripReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITY_SUCCESS:
      let list;

      if (state.deleted && state.deleted.key === action.payload.key) {
        list = [ ...state.previous ];
      }
      else {
        list = [ action.payload, ...state.list ];
      }

      return {
        deleted: null,
        list,
        previous: []
      };

    case DELETE_ACTIVITY_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.filter(activity => {
          return activity.key !== action.payload.key;
        }),
        previous: [ ...state.list ]
      };

    case UPDATE_ACTIVITY_SUCCESS:
      return {
        deleted: null,
        list: state.list.map(activity => {
          return activity.key === action.payload.key ? action.payload : activity;
        }),
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
