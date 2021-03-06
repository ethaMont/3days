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
    activities: PropTypes.object.isRequired,
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
    } = this.props

    const tripId = this.props.routeParams.tripId;

    let displayActivities = true;
    if (this.props.activities.size === 0 || !this.props.activities.get(tripId)) {
      displayActivities = false;
    }

    let activities;
    let currentOrderIndex = 0;
    if (displayActivities) {
      activities = this.props.activities.get(tripId).get('entities').get('trips');
      currentOrderIndex = activities.size > 0 ? activities.last().get('order') + 1 : 0;
    }

    return (
      <div>
        <ActivityToolbar
          tripId={tripId}
          currentOrderIndex={currentOrderIndex}
          createActivity={createActivity} />


        {displayActivities ?
          <div>
            <ActivitiesList
              deleteActivity={(key) => { deleteActivity(tripId, key) } }
              updateActivity={(activityId, data) => { updateActivity(tripId, activityId, data) } }
              createActivityMedia={(activityId, data) => { createActivityMedia(tripId, activityId, data) } }
              deleteActivityMedia={deleteActivityMedia}
              activities={activities} />

            <ActivitiesMap
              activities={activities} />
          </div>
          : null}

      </div>
    );
  }
}

export default connect(state => ({
  activities: state.trip.list,
  auth: state.auth
}), assign({}, tripActions))(Trip);
