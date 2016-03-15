import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
import { notificationActions } from 'modules/notification';
import { tripsActions } from 'modules/trips';

// Components
import { Notification } from './notification';
import { TaskFilters } from './task-filters';
import { TripList } from './trip-list';


export class Trips extends Component {
  static propTypes = {
    createTrip: PropTypes.func.isRequired,
    deleteTrip: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    registerListeners: PropTypes.func.isRequired,
    trips: PropTypes.object.isRequired,
    undeleteTrip: PropTypes.func.isRequired,
    updateTrip: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.registerListeners();
  }

  renderNotification() {
    const {
      dismissNotification,
      notification,
      undeleteTrip
    } = this.props;

    return (
      <Notification
        action={undeleteTrip}
        dismiss={dismissNotification}
        {...notification}/>
    );
  }

  render() {
    const {
      createTrip,
      deleteTrip,
      location,
      notification,
      trips,
      auth,
      updateTrip
    } = this.props;

    const { filter } = location.query;

    return (
      <div style={{paddingTop: '200px'}} className="g-row">
        <div className="g-col">
          <TaskFilters filter={filter}/>
          <TripList
            deleteTrip={deleteTrip}
            filter={filter}
            trips={trips}
            auth={auth}
            updateTrip={updateTrip}/>
        </div>

        {notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}

export default connect(state => ({
  notification: state.notification,
  trips: state.trips.list,
  auth: state.auth
}), assign({}, tripsActions, notificationActions))(Trips);
