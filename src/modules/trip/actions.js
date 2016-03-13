import {
  CREATE_ACTIVITY_ERROR,
  CREATE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_ERROR,
  UPDATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_MEDIA_ERROR,
  CREATE_ACTIVITY_MEDIA_SUCCESS,
  DELETE_ACTIVITY_MEDIA_ERROR,
  DELETE_ACTIVITY_MEDIA_SUCCESS,
} from './action-types';


export function createActivity(tripId, obj) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}/activities`)
      .push(obj, error => {
        if (error) {
          console.error('ERROR @ createActivity :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_ACTIVITY_ERROR,
            payload: error
          });
        }
      });
  };
}

export function createActivityMedia(tripId, activityId, obj) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}/activities/${activityId}/medias`)
      .push(obj, error => {
        if (error) {
          console.error('ERROR @ createActivityMedia :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_ACTIVITY_MEDIA_ERROR,
            payload: error
          });
        }
      });
  };
}


export function deleteActivity(tripId, activityId) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}/activities/${activityId}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteActivity :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_ACTIVITY_ERROR,
            payload: error
          });
        }
      });
  };
}

export function deleteActivityMedia(tripId, activityId, mediaId) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}/activities/${activityId}/medias/${mediaId}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteActivityMedia :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_ACTIVITY_MEDIA_ERROR,
            payload: error
          });
        }
      });
  };
}


export function updateActivity(tripId, activityId, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`trips/${tripId}/activities/${activityId}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateActivity :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_ACTIVITY_ERROR,
            payload: error
          });
        }
      });
  };
}


export function registerListeners(tripId) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.child(`trips/${tripId}/activities/`);

    ref.orderByChild('order').on('child_added', snapshot => dispatch({
      type: CREATE_ACTIVITY_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_ACTIVITY_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_ACTIVITY_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}


function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
