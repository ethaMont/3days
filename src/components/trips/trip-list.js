import React, { Component, PropTypes } from 'react';
import { TripItem } from './trip-item';


export class TripList extends Component {
  static propTypes = {
    deleteTrip: PropTypes.func.isRequired,
    filter: PropTypes.string,
    trips: PropTypes.object.isRequired,
    updateTrip: PropTypes.func.isRequired
  };

  renderTripItems() {
    const {
      deleteTrip,
      filter,
      trips,
      auth,
      updateTrip
    } = this.props;

    return trips
      .valueSeq()
      .filter(trip => {
        if (filter === 'my_trips') {
          return trip.get('user_id') === auth.id;
        }
        return trip;
      })
      .map((trip, index) => {
        return (
          <TripItem
            deleteTrip={deleteTrip}
            key={index}
            trip={trip}
            updateTrip={updateTrip}/>
        );
      });
  }

  render() {
    return (
      <div className="task-list">
        {this.renderTripItems()}
      </div>
    );
  }
}
