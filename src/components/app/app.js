import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from 'config/config';
import { authActions } from 'modules/auth';
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

export class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.signOut = this.signOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth, history } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      history.replace(POST_SIGN_OUT_PATH);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      history.replace(POST_SIGN_IN_PATH);
    }
  }

  signOut() {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const { auth, children } = this.props;

    return (
      <div>
        <AppBar
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

        <main className="main">{children}</main>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}), authActions)(App);
