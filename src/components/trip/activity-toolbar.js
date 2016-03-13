import React, { Component, PropTypes } from 'react';

import { ActivityForm } from './activity-form';
import {
  defaultWidth,
  defaultBackgroundColor,
} from 'config/config';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

export class ActivityToolbar extends Component {
  render() {
    const {
      tripId,
      currentOrderIndex,
      createActivity,
    } = this.props

    const containerStyle = {
      backgroundColor: defaultBackgroundColor,
      position: 'fixed',
      top: '50px',
      zIndex: '1',
      width: defaultWidth,
    };

    const toolbarStyle = {
      paddingLeft: '40px',
      paddingRight: '40px',
      boxSizing: 'border-box',
      marginBottom: '10px',
      marginTop: '10px',
      backgroundColor: 'white',
    };

    return (
      <div style={containerStyle}>
        <Toolbar style={toolbarStyle}>
          <ToolbarGroup firstChild={true} float="left">
            <ActivityForm
              currentOrderIndex={currentOrderIndex}
              createActivity={(data) => {createActivity(tripId, data)}}/>
          </ToolbarGroup>
          <ToolbarGroup float="right">
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
