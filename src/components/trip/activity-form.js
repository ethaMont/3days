import React, { Component, PropTypes } from 'react';
import {
  FILEPICKER_API_KEY,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH,
} from 'config/config';

import TextField from 'material-ui/lib/text-field';

export class ActivityForm extends Component {
  static propTypes = {
    createActivity: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  getDefaultPhoto(photo) {
    return photo.getUrl(
      {
        'maxWidth': ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH,
        'maxHeight': ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT,
      }
    );
  }

  getGeometry(place) {
    return {
      lat: place.location.lat(),
      lng: place.location.lng(),
    }
  }

  componentDidMount() {
    const autoComplete = new google.maps.places.Autocomplete(
      this.refs.add_activity.input,
      {
        // types : ['geocode', 'establishment', 'cities', 'regions'],
      }
    );
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      this.onSubmit(autoComplete.getPlace());
      this.refs.add_activity.input.value = "";
    });
  }

  onSubmit(location) {
    if (location.photos) {
      location.default_photo = this.getDefaultPhoto(location.photos[0]);
    }
    if (location.geometry) {
      location.geometry = this.getGeometry(location.geometry);
    }
    delete location.photos;

    location.order = this.props.currentOrderIndex;
    this.props.createActivity(location);
  }

  render() {
    return (
      <div>
        <TextField
          style={{ width: '504px' }}
          ref="add_activity" />
      </div>
    );
  }
}
