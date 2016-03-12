import Firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'styles/styles.scss';
import { Root } from 'components/root';
import {
  authActions,
  authRouteResolver,
} from 'modules/auth';

import {
  FIREBASE_URL,
  FILEPICKER_API_KEY,
} from 'config/config';

import configureStore from './store';

import filepicker from 'filepicker-js';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore({
  firebase: new Firebase(FIREBASE_URL)
});

const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();
filepicker.setKey(FILEPICKER_API_KEY);

store.dispatch(authActions.initAuth());

ReactDOM.render((
  <Root
    history={history}
    onEnter={authRouteResolver(store.getState)}
    store={store} />
), document.querySelector('.app-root'));
