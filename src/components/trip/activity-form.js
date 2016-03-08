import React, { Component, PropTypes } from 'react';

import Geosuggest from 'react-geosuggest';

export class ActivityForm extends Component {
  static propTypes = {
    createActivity: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  onSubmit(location) {
    delete location.gmaps.geometry;
    this.props.createActivity(location);
  }

  render() {
    return (
      <div>
        <Geosuggest
          placeholder="Start typing!"
          initialValue="Add a place"
          onSuggestSelect={(location) => this.onSubmit(location)} />
      </div>
    );
  }
}
