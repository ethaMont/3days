import React, { Component, PropTypes } from 'react';

export class ActivityItemMedias extends Component {

  generateMedia(key, media) {
    return (
      <div key={key}><img src={media.url} /></div>
    );
  }

  generateMedias(medias) {
    let mediasRender = [];

    if (!medias || medias.length <= 0) {
      return mediasRender;
    }
    for (let key in medias) {
      mediasRender.push(this.generateMedia(key, medias[key]));
    }

    return mediasRender;
  }

  render() {
    return (
      <div className="medias-list">
        {this.generateMedias(this.props.medias) }
      </div>
    );
  }
}
