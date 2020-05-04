import React from 'react';
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
}));


export default function MainScreen(props){
  const classes = useStyles();
  const switchScreen = props.switchScreen;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Typography variant="h3">Inami-Stream</Typography>
          <Paper className={classes.paper}>
            <Button variant="contained" color="primary" fullWidth={true} onClick={()=>switchScreen("library")}>Library</Button>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}