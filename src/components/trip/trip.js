import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Modules
// import { notificationActions } from 'modules/notification';
import { tripActions } from 'modules/trip';

// Components
import { ActivityToolbar } from './activity-toolbar';
import { ActivitiesList } from './activities-list';
import { ActivitiesMap } from './activities-map';


export class Trip extends Component {
  static propTypes = {
    createActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
    createActivityMedia: PropTypes.func.isRequired,
    deleteActivityMedia: PropTypes.func.isRequired,
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
      createActivityMedia,
      deleteActivityMedia,
      activities,
    } = this.props

    const tripId = this.props.routeParams.tripId

    return (
      <div>
        <ActivityToolbar
          tripId={tripId}
          createActivity={createActivity} />

        <div>

          <ActivitiesList
            deleteActivity={(key) => {deleteActivity(tripId, key)}}
            updateActivity={updateActivity}
            createActivityMedia={(activityId, data) => {createActivityMedia(tripId, activityId, data)}}
            deleteActivityMedia={deleteActivityMedia}
            activities={activities} />

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
