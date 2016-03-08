import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

// Config
import { SIGN_IN_PATH, TRIPS_PATH, TRIP_PATH } from 'config';

// Components
import App from './app/app';
import SignIn from './sign-in/sign-in';
import Trips from './trips/trips';
import Trip from './trip/trip';


export class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onEnter: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { history, onEnter, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={App} onEnter={onEnter} path="/">
            <Route component={SignIn} path={SIGN_IN_PATH}/>
            <Route component={Trips} path={TRIPS_PATH}/>
            <Route component={Trip} path={`${TRIP_PATH}:tripTitle/:tripId`}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
