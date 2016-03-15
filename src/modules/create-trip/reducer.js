import {
  CREATE_TRIP_DISMISS,
  CREATE_TRIP_INIT
} from './action-types';

export const initialState = {
  title: '',
  description: '',
  floatingLabelText: '',
  hintText: '',
  display: false,
  primaryButtonLabel: 'Create',
};

export function createTripModalReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRIP_DISMISS:
      return {
        display: false,
      };

    case CREATE_TRIP_INIT:
      return {
        title: 'Create a new trip',
        description: 'Enter the name of the trip. You will be able to add activities to it after',
        floatingLabelText: "Trip's name",
        hintText: "Restaurants, parks in Paris...",
        primaryButtonLabel: 'Create',
        display: true,
      };

    default:
      return state;
  }
}
