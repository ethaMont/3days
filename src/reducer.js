import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import { authReducer } from 'modules/auth';
import { firebaseReducer } from 'modules/firebase';
import { notificationReducer } from 'modules/notification';
import { tripsReducer } from 'modules/trips';
import { tripReducer } from 'modules/trip';
import { createTripModalReducer } from 'modules/create-trip';


export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  notification: notificationReducer,
  routing: routerReducer,
  trips: tripsReducer,
  trip: tripReducer,
  createTripModal: createTripModalReducer,
});
