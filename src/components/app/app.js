import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  POST_SIGN_IN_PATH,
  POST_SIGN_OUT_PATH,
} from 'config/config';
import { authActions } from 'modules/auth';
import { browserHistory } from 'react-router'

import BodyLayoutElement from '../layout/body-layout-element';
import TopAppBar from '../layout/top-app-bar';

export class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
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

  render() {
    const {
      auth,
      children,
      signOut,
    } = this.props;

    return (
      <div>
        <TopAppBar
          auth={auth}
          signOut={signOut} />

        <BodyLayoutElement>{children}</BodyLayoutElement>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}), authActions)(App);
