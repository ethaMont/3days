import React, { Component } from 'react';
import { defaultWidth } from 'config/config';

export default class BodyLayoutElement extends Component {
  render() {
    const style = {
      width: defaultWidth,
      margin: '0 auto',
      position: 'relative',
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
