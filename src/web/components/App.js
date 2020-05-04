import React from 'react';
import MainScreen from './MainScreen';
import VideoScreen from './VideoScreen';
import LibraryScreen from './LibraryScreen';
import Theme from '../Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {screen: "main"}
  }

  switchScreen = (screen, context) => {

    this.setState({
      screen: screen,
      ...context
    });
  }

  renderScreen(){
    switch(this.state.screen){
      case "main": 
        return(<MainScreen switchScreen={this.switchScreen}/>);
      case "video": 
        return(<VideoScreen switchScreen={this.switchScreen} video={{name:this.state.name, path:this.state.path}}/>);
      case "library": 
        return(<LibraryScreen switchScreen={this.switchScreen}/>);
    }
  }

  render(){
    return( 
      <React.Fragment>
        <ThemeProvider theme={Theme}>
          <CssBaseline/>
          {this.renderScreen()}
        </ThemeProvider>
      </React.Fragment>
    );
  }
}