import React, { Component, PropTypes } from 'react';
import {
  FILEPICKER_API_KEY,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH,
} from 'config/config';

import Geosuggest from 'react-geosuggest';

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

  onSubmit(location) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails(
      {
        placeId: location.gmaps.place_id,
      }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          location.details = place;

          if(location.details.photos){
            location.default_photo = this.getDefaultPhoto(location.details.photos[0]);
          }
        }

        delete location.gmaps.geometry;
        delete location.details.geometry;
        delete location.details.photos;
        this.props.createActivity(location);
      });
  }


  render() {
    return (
      <div>
        <Geosuggest
          placeholder="Start typing!"
          initialValue="Add a place"
          onSuggestSelect={(location) => this.onSubmit(location) } />
      </div>
    );
  }
}
