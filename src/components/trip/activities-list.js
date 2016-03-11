import React, { Component, PropTypes } from 'react';
import { ActivityItem } from './activity-item';

export class ActivitiesList extends Component {
  static propTypes = {
    deleteActivity: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    updateActivity: PropTypes.func.isRequired,
    createActivityMedia: PropTypes.func.isRequired,
    deleteActivityMedia: PropTypes.func.isRequired,
  };

  renderTripActivities() {
    const {
      deleteActivity,
      activities,
      createActivityMedia,
      deleteActivityMedia,
      updateActivity,
    } = this.props;

    return activities
      .map((activity, index) => {
        return (
          <ActivityItem
            deleteActivity={deleteActivity}
            key={index}
            activity={activity}
            createActivityMedia={createActivityMedia}
            deleteActivityMedia={deleteActivityMedia}
            updateActivity={updateActivity}/>
        );
      });
  }

  render() {
    const styleList={
      width: '50%',
      height: 'calc(100% - 80px)',
      position: 'absolute',
      overflowY: 'auto',
    }

    return (
      <div style={styleList}
        className="activities-list">
        {this.renderTripActivities()}
      </div>
    );
  }
}
