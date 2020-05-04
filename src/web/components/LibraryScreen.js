import React, {useState} from 'react';
import LibraryList from './LibraryList';
import LibraryView from './LibraryView';
import Navigation from './Navigation';

export default function LibraryScreen(props){
  const [lib, setLib] = useState(null);
  const switchScreen = props.switchScreen;

  if (lib === null){
    return (
      <React.Fragment>
        <Navigation navigate={switchScreen} navigateBack="main"/>
        <LibraryList setLib={setLib}/>
      </React.Fragment>
    );
  }
  else {
    return (
      <React.Fragment>
        <Navigation navigate={setLib} navigateBack={null}/>
        <LibraryView lib={lib} switchScreen={switchScreen}/>
      </React.Fragment>
    );
  }
}
