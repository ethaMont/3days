import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { TRIPS_PATH } from 'config';


export class TaskFilters extends Component {
  static propTypes = {
    filter: PropTypes.string
  };

  render() {
    const { filter } = this.props;

    return (
      <ul className="task-filters">
        <li><Link className={classNames({active: !filter})} to={TRIPS_PATH}>View All</Link></li>
        <li><Link activeClassName="active" to={TRIPS_PATH} query={{filter: 'my_trips'}}>My trips</Link></li>
      </ul>
    );
  }
}
