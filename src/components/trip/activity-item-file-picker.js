import React, { Component, PropTypes } from 'react';
import { FILEPICKER_API_KEY } from 'config';
import filepicker from 'filepicker-js';

export class ActivityItemFilePicker extends Component {
  static propTypes = {
    createActivityMedia: PropTypes.func.isRequired,
    deleteActivityMedia: PropTypes.func.isRequired,
  };

  componentWillMount() {
    //TODO to trigger only once
    filepicker.setKey(FILEPICKER_API_KEY);
  }

  launchFilePicker() {
    filepicker.pickMultiple(
      (blobs) => {
        for (let media of blobs){
          this.props.createActivityMedia(media);
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  render() {
    return (
      <span onClick={() => { this.launchFilePicker() } }>Add media</span>
    );
  }
}
