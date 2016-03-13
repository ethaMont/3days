import {
  normalize,
  Schema,
  arrayOf,
} from 'normalizr';

const trip = new Schema('trips', { idAttribute: 'key' });
const activity = new Schema('activities', { idAttribute: 'key' });

export function normalizeActivity(response) {
  return normalize(response, { activity: activity });
}

export function normalizeActivities(response) {
  return normalize(response, { activities: arrayOf(activity) });
}

export function normalizeTrip(response) {
  return normalize(response, { trip: trip });
}

export function normalizeTrips(response) {
  return normalize(response, { trips: arrayOf(trip) });
}
