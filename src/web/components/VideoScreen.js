import React from 'react';
import Navigation from './Navigation';
import InamiPlayer from './InamiPlayer'

export default function VideoScreen(props){
  const switchScreen = props.switchScreen;
  const video = props.video;

  return (
    <React.Fragment>
      <Navigation navigate={switchScreen} navigateBack="library"/>
      <InamiPlayer video={video}></InamiPlayer>
    </React.Fragment>
  );
}