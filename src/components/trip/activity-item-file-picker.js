import React, { Component, PropTypes } from 'react';
import filepicker from 'filepicker-js';
import FontIcon from 'material-ui/lib/font-icon';

export class ActivityItemFilePicker extends Component {
  static propTypes = {
    createActivityMedia: PropTypes.func.isRequired,
    deleteActivityMedia: PropTypes.func.isRequired,
  };

  launchFilePicker() {
    filepicker.pickMultiple(
      {
        // services: ['COMPUTER', 'FACEBOOK', 'BOX', 'IMGUR', 'CLOUDDRIVE'],
      },
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
    const iconStyles = {
      color: 'white',
      fontSize: '37px',
      padding: '17px',
      cursor: 'pointer',
    };

    return (
      <li onTouchTap={() => { this.launchFilePicker() } }>
        <FontIcon
          style={iconStyles}
          className="material-icons">
        library_add
        </FontIcon>
      </li>
    );
  }
}
