import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
// import { notificationActions } from 'modules/notification';
import { tripActions } from 'modules/trip';

// Components
import { ActivityForm } from './activity-form';
import { ActivitiesList } from './activities-list';
import { ActivitiesMap } from './activities-map';


export class Trip extends Component {
  static propTypes = {
    createActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
    registerListeners: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
//     location: PropTypes.object.isRequired,
//     notification: PropTypes.object.isRequired,
//     undeleteTrip: PropTypes.func.isRequired,
//     updateTrip: PropTypes.func.isRequired
  };

  componentWillMount() {
    const tripId = this.props.routeParams.tripId
    this.props.registerListeners(tripId);
  }

  render() {
    const {
      createActivity,
      deleteActivity,
      updateActivity,
      activities,
    } = this.props
    
    const tripId = this.props.routeParams.tripId
    
    return (
      <div className="g-row">
        <div className="g-col">
          <ActivityForm createActivity={(data) => {createActivity(tripId, data)}}/>
        </div>

        <div className="g-col">
          <ActivitiesList
            deleteActivity={(key) => {deleteActivity(tripId, key)}}
            updateActivity={updateActivity}
            activities={activities} />
        </div>
        <div className="g-col">
          <ActivitiesMap
            activities={activities} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  activities: state.trip.list,
  auth: state.auth
}), assign({}, tripActions))(Trip);
