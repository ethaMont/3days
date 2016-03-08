import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

// Reducers
import { authReducer } from 'modules/auth';
import { firebaseReducer } from 'modules/firebase';
import { notificationReducer } from 'modules/notification';
import { tripsReducer } from 'modules/trips';
import { tripReducer } from 'modules/trip';


export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  notification: notificationReducer,
  routing: routeReducer,
  trips: tripsReducer,
  trip: tripReducer,
});
