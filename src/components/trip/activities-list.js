import React, { Component, PropTypes } from 'react';
import { ActivityItem } from './activity-item';
import { paddingTopTrip } from 'config/config';

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
      .sort((a,b) => {
          return b.order - a.order;
      })
      .map((activity, index) => {
        const firstItem = index === 0;
        const lastItem = index === (activities.length - 1);

        return (
          <ActivityItem
            deleteActivity={deleteActivity}
            key={index}
            firstItem={lastItem}
            lastItem={firstItem}
            activity={activity}
            createActivityMedia={createActivityMedia}
            deleteActivityMedia={deleteActivityMedia}
            updateActivity={updateActivity}
            prevItem={!lastItem ? activities[index + 1] : null}
            nextItem={!firstItem ? activities[index - 1] : null}
            />
        );
      });
  }

  render() {
    const styleList = {
      width: '50%',
      paddingLeft: '3px',
      boxSizing: 'border-box',
      paddingTop: `${paddingTopTrip}px`,
      display: 'flex',
      flexDirection: 'column-reverse',
      flexWrap: 'nowrap',
    }

    return (
      <div style={styleList}>
        {this.renderTripActivities() }
      </div>
    );
  }
}
