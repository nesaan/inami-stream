import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@material-ui/core';
import walk from "../Walk";
import placeholder from '../placeholder.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  card: {
    width: 200
  },
  media: {
    height: 200
  }
}));

export default function LibraryView(props){
  const classes = useStyles();
  const lib = props.lib;
  const switchScreen = props.switchScreen;

  function isSupportedVideo(file){
    return file.match(/\.(webm|mp4)$/g)
  }

  function generateFiles(){
    const fileTiles = [];
    walk(lib.path, function(file, path){
      if (!isSupportedVideo(file)) return;
      fileTiles.push(
        <Grid item xs key={path}>
          <Card className={classes.card} onClick={()=>{switchScreen("video", {name: file, path: path})}}>
            <CardActionArea>
              <CardMedia
                image={placeholder}
                title={file}
                className={classes.media}
              />
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {file}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
    return fileTiles;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {generateFiles()}
      </Grid>
    </div>
  );
}