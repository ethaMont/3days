import { TRIP_PATH } from 'config/config';
import slug from 'limax';

export function getTripUrl(tripId, tripTitle) {
  const slugUrl = slug(tripTitle);
  return `${TRIP_PATH}${slugUrl}/${tripId}`
}
