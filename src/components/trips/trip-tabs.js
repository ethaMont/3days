import React, { Component, PropTypes } from 'react';
import { TRIPS_PATH } from 'config/config';

import { browserHistory } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

const TripTabs = (props) => (
  <Tabs
    onChange={ (e) => { browserHistory.push({ pathname: TRIPS_PATH, query: e }) } }
    >
    <Tab
      icon={<FontIcon className="material-icons">view_module</FontIcon>}
      label="View All"
      selected={props.filter === ''}
      value={{ filter: '' }}
      />
    <Tab
      icon={<FontIcon className="material-icons">flight_takeoff</FontIcon>}
      label="My trips"
      selected={props.filter === 'my_trips'}
      value={{ filter: 'my_trips' }}
      />
    <Tab
      icon={<FontIcon className="material-icons">people</FontIcon>}
      label="Following"
      />
    <Tab
      icon={<FontIcon className="material-icons">people_outline</FontIcon>}
      label="Followers"
      />
  </Tabs>
);

TripTabs.propTypes = {
  filter: PropTypes.string
};


export default TripTabs;
