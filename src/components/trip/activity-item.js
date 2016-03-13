// import classNames from 'classnames';
// import { Link } from 'react-router';
// import { ActivityItemFilePicker } from './activity-item-file-picker';
// import { ActivityItemMedias } from './activity-item-medias';

// import React, { Component, PropTypes } from 'react';
// export class ActivityItem extends Component {
//   static propTypes = {
//     deleteActivity: PropTypes.func.isRequired,
//     activity: PropTypes.object.isRequired,
//     updateActivity: PropTypes.func.isRequired,
//     createActivityMedia: PropTypes.func.isRequired,
//     deleteActivityMedia: PropTypes.func.isRequired,
//   };

//   constructor(props, context) {
//     super(props, context);

//     this.state = {editing: false};

//     this.editTitle = this.editTitle.bind(this);
//     this.saveTitle = this.saveTitle.bind(this);
//     this.stopEditing = this.stopEditing.bind(this);
//     this.onKeyUp = this.onKeyUp.bind(this);
//   }

//   editTitle() {
//     this.setState({editing: true});
//   }

//   saveTitle(event) {
//     if (this.state.editing) {
//       const { trip } = this.props;
//       const title = event.target.value.trim();

//       if (title.length && title !== trip.title) {
//         this.props.updateTrip(trip, {title});
//       }

//       this.stopEditing();
//     }
//   }

//   stopEditing() {
//     this.setState({editing: false});
//   }

//   onKeyUp(event) {
//     if (event.keyCode === 13) {
//       this.saveTitle(event);
//     }
//     else if (event.keyCode === 27) {
//       this.stopEditing();
//     }
//   }

//   renderTitle(activity) {
//     return (
//       <div
//         onclick=""
//         className="trip-item__title"
//         ref="titleText"
//         tabIndex="0">
//             {activity.label}
//       </div>
//     );
//   }

//   renderTitleInput(activity) {
//     return (
//       <input
//         autoComplete="off"
//         autoFocus
//         className="trip-item__input"
//         defaultValue={activity.label}
//         maxLength="64"
//         onBlur={this.saveTitle}
//         onKeyUp={this.onKeyUp}
//         ref="titleInput"
//         type="text"/>
//     );
//   }

//   renderImage(media, index) {
//     console.debug(media)
//   }

//   render() {
//     const { editing } = this.state;
//     const {
//       activity,
//       deleteActivity,
//       createActivityMedia,
//       deleteActivityMedia,
//     } = this.props;

//     return (
//       <div className={classNames('trip-item', {'trip-item--editing': editing})} tabIndex="0">
//         <div className="cell">
//           {editing ? this.renderTitleInput(activity) : this.renderTitle(activity)}
//         </div>

//         <div className="cell">
//           <button
//             aria-hidden={!editing}
//             aria-label="Cancel editing"
//             className={classNames('trip-item__button', {'hide': !editing})}
//             onClick={this.stopEditing}
//             ref="cancelEditButton"
//             type="button">
//             <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
//               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
//               <path d="M0 0h24v24H0z" fill="none"></path>
//             </svg>
//           </button>
//           <button
//             aria-hidden={editing}
//             aria-label="Edit trip"
//             className={classNames('trip-item__button', {'hide': editing})}
//             onClick={this.editTitle}
//             ref="editButton"
//             type="button">
//             <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
//               <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
//             </svg>
//           </button>
//           <button
//             aria-hidden={editing}
//             aria-label="Delete trip"
//             className={classNames('trip-item__button', {'hide': editing})}
//             onClick={() => deleteActivity(activity.key)}
//             ref="deleteButton"
//             type="button">
//             <svg className="icon"  width="24" height="24" viewBox="0 0 24 24">
//               <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
//             </svg>
//           </button>
//         </div>


//       </div>
//     );
//   }
// }
// import React from 'react';
import React, { Component, PropTypes } from 'react';
import { ActivityItemMedias } from './activity-item-medias';

import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Toggle from 'material-ui/lib/toggle';

export class ActivityItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleMoveUp = () => {
    const {
      activity,
      prevItem,
      updateActivity,
    } = this.props;

    updateActivity(prevItem.get('key'), { order: activity.get('order') });
    updateActivity(activity.get('key'), { order: prevItem.get('order') });
  };

  handleMoveDown = () => {
    const {
      activity,
      nextItem,
      updateActivity,
    } = this.props;

    updateActivity(nextItem.get('key'), { order: activity.get('order') });
    updateActivity(activity.get('key'), { order: nextItem.get('order') });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    const {
      editing,
      expanded,
    } = this.state;

    const {
      activity,
      deleteActivity,
      createActivityMedia,
      deleteActivityMedia,
      firstItem,
      lastItem,
    } = this.props;

    const containerStyle = {
      marginBottom: '10px',
    };

    const titleStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordWrap: 'break-word',
      whiteSpace: 'nowrap',
      width: '100%',
      float: 'left',
      display: 'inline-block',
    };

    const iconButtonStyle = {
      float: 'right',
      marginRight: '-4px',
    };

    return (
      <div
        className="activity-item"
        id={`activity-${activity.get('key')}`}
        style={ containerStyle }>
        <Card key={activity.get('key')} expanded={expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            titleStyle={titleStyle}
            subtitleStyle={titleStyle}
            title={activity.get('name')}
            subtitle={activity.get('types').join(', ') }
            avatar={activity.get('icon')}
            actAsExpander={true}
            showExpandableButton={true}
            textStyle={{ width: 'calc(100% - 90px)' }}
            />

          <ActivityItemMedias
            createActivityMedia={ (data) => {createActivityMedia(activity.get('key'), data)} }
            deleteActivityMedia={deleteActivityMedia}
            medias={activity.get('medias')}
            expandable={expanded}
            defaultMedia={activity.get('default_photo')} />

          {expanded ?
            <CardTitle
              subtitle={activity.get('adr_address').replace(/<(?:.|\n)*?>/gm, '') } />
            : null}

          <CardText expandable={true}>
            <div onTouchTap={ () => { alert('Not plugged yet') } }>
              [Add description]
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Delete" onTouchTap={(data) => { deleteActivity(activity.get('key')) } } />
            <FlatButton label="Add to my trip" onTouchTap={ () => { alert('Not plugged yet') } } />

            {!lastItem ?
              <IconButton
                style={iconButtonStyle}
                onTouchTap={() => { this.handleMoveDown() } }>
                <FontIcon className="material-icons">arrow_downward</FontIcon>
              </IconButton>
              : null}
            {!firstItem ?
              <IconButton
                style={iconButtonStyle}
                onTouchTap={() => { this.handleMoveUp() } }>
                <FontIcon className="material-icons">arrow_upward</FontIcon>
              </IconButton>
              : null}

          </CardActions>
        </Card>
      </div>
    );
  }
}
