import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'object-assign';

// UI
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';

// TODO : auth the user if is not user

export class CreateTripModal extends Component {
  static propTypes = {
    createTrip: PropTypes.func.isRequired,
    createTripModal: PropTypes.object.isRequired,
    initCreateTripModal: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      valueTextFieldCreateTrip: '',
      error: false,
    };
  }

  validateTilte(value) {
    if (value.length <= 0) {
      return true;
    }
    return false;
  }

  handleChange = (event) => {
    const value = event.target.value;
    let error = false;

    this.setState({
      valueTextFieldCreateTrip: value,
      error: this.validateTilte(value),
    });
  };

  render() {
    const {
      createTrip,
      createTripModal,
      initCreateTripModal,
      dismissCreateTripModal,
    } = this.props;

    const {
      error,
      valueTextFieldCreateTrip,
    } = this.state;

    const floatingActionButtonSyle = {
      zIndex: '2',
      position: 'fixed',
      top: '58px',
      right: '10px',
    };

    return (
      <div>
        <Dialog
          title={createTripModal.title}
          actions={[
            <FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={() => { dismissCreateTripModal(); } }
              />,
            <FlatButton
              label={createTripModal.primaryButtonLabel || "Submit"}
              primary={true}
              disabled={error ? true : false}
              onTouchTap={() => {
                createTrip(valueTextFieldCreateTrip);
                dismissCreateTripModal();
              } }
              />
          ]}
          modal={false}
          autoScrollBodyContent={true}
          open={createTripModal.display }
          onRequestClose={() => { dismissCreateTripModal(); } }
          >
          <p>{createTripModal.description}</p>

          <TextField
            fullWidth={true}
            onChange={this.handleChange}
            value={valueTextFieldCreateTrip}
            hintText={createTripModal.hintText}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && !this.validateTilte(e.target.value)) {
                createTrip(valueTextFieldCreateTrip);
                dismissCreateTripModal();
              }
            } }
            floatingLabelText={createTripModal.floatingLabelText}
            />
        </Dialog>

        <FloatingActionButton
          style={floatingActionButtonSyle}
          onTouchTap={() => { initCreateTripModal() } }
          secondary={true}>
          <FontIcon className="material-icons" style={{ color: 'white' }}>add</FontIcon>
        </FloatingActionButton>
      </div >
    );
  }
}
