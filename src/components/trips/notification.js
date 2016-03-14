import React, { Component, PropTypes } from 'react';

import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';

export class Notification extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    actionLabel: PropTypes.string.isRequired,
    dismiss: PropTypes.func.isRequired,
    display: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    message: PropTypes.string.isRequired
  };

  render() {
    const {
      action,
      actionLabel,
      dismiss,
      display,
      duration,
      message,
    } = this.props;

    return (
        <Snackbar
          open={display}
          message={message}
          action={actionLabel}
          autoHideDuration={duration || 5000}
          onActionTouchTap={action}
          onRequestClose={dismiss}
        />
    );
  }
}
