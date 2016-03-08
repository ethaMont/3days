import React, { Component, PropTypes } from 'react';
import { ActivityItem } from './activity-item';


export class ActivitiesList extends Component {
  static propTypes = {
    deleteActivity: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    updateActivity: PropTypes.func.isRequired
  };

  renderTripActivities() {
    const {
      deleteActivity,
      activities,
      updateActivity,
    } = this.props;
   
    return activities
      .map((activity, index) => {
        return (
          <ActivityItem
            deleteActivity={deleteActivity}
            key={index}
            activity={activity}
            updateActivity={updateActivity}/>
        );
      });
  }

  render() {
    return (
      <div className="task-list">
        {this.renderTripActivities()}
      </div>
    );
  }
}
