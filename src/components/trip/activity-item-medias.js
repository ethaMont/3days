import React, { Component, PropTypes } from 'react';
import CardMedia from 'material-ui/lib/card/card-media';
import {
  FILEPICKER_API_KEY,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT,
  ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH,
} from 'config/config';
import { ActivityItemFilePicker } from './activity-item-file-picker';

export class ActivityItemMedias extends Component {

  generateMediaUrl(widthImg, heightImg, media) {
    const imageTransform = `resize=width:${widthImg},height:${heightImg},fit:crop`;
    const url = `https://process.filepicker.io/${FILEPICKER_API_KEY}/${imageTransform}/${media.url}`;

    return url;
  }

  generateMedia(key, media) {
    const sizeImg = 75;

    return (
      <li key={key}>
        <img src={this.generateMediaUrl(sizeImg, sizeImg, media)} width={sizeImg} height={sizeImg} />
      </li>
    );
  }

  generateOverlay(medias) {
    const styleList = {
      listStyle: 'none',
    };
    const {
      createActivityMedia,
      deleteActivityMedia,
    } = this.props;

    return (
      //TODO scrolling horizontal css
      <ul className="activity-item-medias-list">
        <ActivityItemFilePicker
          createActivityMedia={(data) => {createActivityMedia(activity.key, data)}}
          deleteActivityMedia={deleteActivityMedia} />
        {this.generateMedias(medias)}
      </ul>
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

  getBigPhoto() {
    const {
      medias,
      defaultMedia,
    } = this.props;
    if (defaultMedia){
      return (
        <img src={defaultMedia}
          width={ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH}
          height={ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT} />
      );
    }else if (medias){
      return (
        <img src={this.generateMediaUrl(ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH, ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT, medias[Object.keys(medias)[0]])}
          width={ACTIVITY_ITEM_MEDIA_LIST_MAX_WIDTH}
          height={ACTIVITY_ITEM_MEDIA_LIST_MAX_HEIGHT} />
      );
    }
  }

  render() {
    const {
      medias,
      expandable,
   } = this.props;

   if (!expandable) {
     return null;
   }

   return (
     <CardMedia
       style={{minHeight:'100px'}}
       overlay={this.generateOverlay(medias)}>
       {this.getBigPhoto()}
     </CardMedia>
   );
  }
}
