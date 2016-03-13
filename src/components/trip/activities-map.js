import React, { Component, PropTypes } from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { paddingTopTrip } from 'config/config';

export class ActivitiesMap extends Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
  };

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  clickMarker(activity) {
    const element = document.querySelector(`#activity-${activity.key}`);
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const offset = elemRect.top - bodyRect.top;

    window.scrollTo(0, offset - paddingTopTrip);
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
            lat={activity.geometry.lat}
            lng={activity.geometry.lng}
            onClick={() => { this.clickMarker(activity) }}
            draggable={false} />
        );
      });
  }

  render() {
    const styleMap = {
      width: '512px',
      display: 'inline-block',
      boxSizing: 'border-box',
      marginLeft: '533px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      position: 'fixed',
      top: `${paddingTopTrip}px`,
      bottom: '0px',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12)',
    };

    let coords = {
      lat: 51.5258541,
      lng: -0.08040660000006028,
    };

    const {
      activities,
    } = this.props;

    if(activities.length > 0){
      coords = activities[0].geometry;
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
