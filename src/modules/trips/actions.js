import {
  CREATE_TRIP_ERROR,
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_ERROR,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_ERROR,
  UPDATE_TRIP_SUCCESS
} from './action-types';

import {
  normalizeTrip,
} from 'schema/normalize'

export function createTrip(title) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/`)
      .push({
        completed: false,
        title: title,
        user_id: auth.id
      }, error => {
        if (error) {
          console.error('ERROR @ createTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function deleteTrip(tripId) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function undeleteTrip() {
  return (dispatch, getState) => {
    const { auth, firebase, trips } = getState();
    const trip = trips.deleted.entities.trips[Object.keys(trips.deleted.entities.trips)[0]];

    firebase
      .child(`trips/${trip.key}`)
      .set(trip, error => {
        if (error) {
          console.error('ERROR @ undeleteTrip :', error); // eslint-disable-line no-console
        }
      });
  };
}


export function updateTrip(tripKey, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripKey}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateTrip :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_TRIP_ERROR,
            payload: error
          });
        }
      });
  };
}


export function registerListeners() {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.child(`trips/`);

    ref.on('child_added', snapshot => dispatch({
      type: CREATE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_TRIP_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}


function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return normalizeTrip({ trip: record });
}
