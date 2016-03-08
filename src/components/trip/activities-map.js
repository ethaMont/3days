import React, { Component, PropTypes } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

export class ActivitiesMap extends Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
  };

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  renderTripActivities() {
    const {
      activities,
    } = this.props;
   
    return activities
      .map((activity, index) => {
        return (
          <Marker
            key={activity.key}
            lat={activity.location.lat}
            lng={activity.location.lng}
            draggable={false} />
        );
      });
  }

  render() {
    let coords = {
    lat: 51.5258541,
    lng: -0.08040660000006028,
    };

    const {
      activities,
    } = this.props;
    
    if(activities.length > 0){
      coords = activities[0].location;
    }
    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        zoom={12}
        lat={coords.lat}
        lng={coords.lng}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}>
        {this.renderTripActivities()}
      </Gmaps>
    );
  }
}
