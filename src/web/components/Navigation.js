import React from 'react';
import {Container, IconButton} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container:{
    paddingTop: theme.spacing(2)
  }
}));



export default function Navigation(props){
  const navigateBack = () => props.navigate(props.navigateBack);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <IconButton edge="start" onClick={navigateBack}>
        <ArrowBack/>
      </IconButton>
    </Container>
  );
}