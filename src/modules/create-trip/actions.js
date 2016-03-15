import {
  CREATE_TRIP_DISMISS,
  CREATE_TRIP_INIT,
} from './action-types';

export function dismissCreateTripModal() {
  return {
    type: CREATE_TRIP_DISMISS
  };
}

export function initCreateTripModal() {
  return {
    type: CREATE_TRIP_INIT
  };
}
