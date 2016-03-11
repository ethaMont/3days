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
    const styleMap = {
      width: 'calc(50% - 20px)',
      position: 'absolute',
      right: '0',
      height: 'calc(100% - 80px)',
      boxSizing: 'border-box',
      marginRight: '10px',
      backgroundColor: 'rgba(255,255,255,0.2)',
    };

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
      <div
        style={styleMap}>
        <Gmaps
          width={'100%'}
          height={'100%'}
          zoom={12}
          lat={coords.lat}
          lng={coords.lng}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}>
          {this.renderTripActivities()}
        </Gmaps>
      </div>
    );
  }
}
