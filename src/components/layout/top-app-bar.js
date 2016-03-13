import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

export default class TopAppBar extends Component {

  signOut() {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const {
      auth,
    } = this.props;

    const style = {
      position: 'fixed',
      top: '0px',
    };

    return (
      <AppBar
        style={style}
        title="3 Days"
        onTitleTouchTap={() => { browserHistory.push('/trips') } }
        iconElementLeft={(
          <IconButton
            onTouchTap={() => { browserHistory.push('/trips') } }>
            <FontIcon className="material-icons" style={{ color: 'white' }}>card_travel</FontIcon>
          </IconButton>) }
        iconElementRight={auth.authenticated ? (
          <IconButton
            onTouchTap={() => { this.signOut() } }>
            <FontIcon className="material-icons" style={{ color: 'white' }}>exit_to_app</FontIcon>
          </IconButton>) : null}
        />
    );
  }
}
