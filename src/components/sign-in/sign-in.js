import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'modules/auth';


export class SignIn extends Component {
  static propTypes = {
    signInWithGoogle: PropTypes.func.isRequired,
    signInWithTwitter: PropTypes.func.isRequired
  };

  render() {
    const {
      signInWithGoogle,
      signInWithTwitter
    } = this.props;

    return (
      <div className="g-row sign-in">
        <div className="g-col">
          <h1 className="sign-in__heading">Sign in</h1>
          <button className="sign-in__button" onClick={signInWithGoogle} type="button">With Gmail</button>
        </div>
      </div>
    );
  }
}

        //   <button className="sign-in__button" onClick={signInWithTwitter} type="button">Twitter</button>
export default connect(null, authActions)(SignIn);
