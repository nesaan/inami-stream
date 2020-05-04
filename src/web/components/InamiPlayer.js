import React, {useState, useRef, useEffect} from 'react';
import { Container, IconButton, Paper, Slider, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const useStyles = makeStyles((theme) => ({
  video: {
    width:"100%",
    maxHeight:"100%"
  },
  container:{
    paddingTop: theme.spacing(2),
  },
  respectBox:{
    position:"relative"
  },
  respectBoxHM:{
    position:"relative",
    cursor: "none"
  },
  controlBar:{
    display:"flex",
    alignItems:"center",
    position: "absolute",
    borderRadius: 14,
    width: "92%",
    bottom: theme.spacing(3.5),
    margin: "0% 4%",
    padding: theme.spacing(0.5,1),
    opacity: "70%"
  },
  controlBarHM:{
    cursor:"none",
    display:"flex",
    alignItems:"center",
    position: "absolute",
    borderRadius: 14,
    width: "92%",
    bottom: theme.spacing(3.5),
    margin: "0% 4%",
    padding: theme.spacing(0.5,1),
    opacity: "0%"
  },
  sliderVid:{
    flexGrow:5,
    width: 0,
    margin: theme.spacing(0,1)
  },
  sliderVol:{
    flexGrow:1,
    width:0,
    margin: theme.spacing(0,1)
  }
}));
let time = Date.now();


export default function InamiPlayer(props){
  const video = props.video;
  const classes = useStyles();
  const [play, setPlay] = useState(false);
  const videoPlayer = useRef(null);
  const videoPlayerContainer = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState({value:75, mute:false});
  const [mouse, setMouse] = useState(true);
  const [hosting, setHosting] = useState(false);
  const mounted = useIsMountedRef();
  let timeout;

  function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
  }

  useEffect(()=>{
    videoPlayer.current.volume = volume.mute ? 0 : volume.value/100;
    videoPlayerContainer.current.onmousemove = ()=>{
      clearTimeout(timeout);
      time = Date.now();
      timeout = setTimeout(()=> {
        if (Date.now() - time > 3800){
          if (mounted.current) setMouse(false);
        }
      }, 4300);
      if (mounted.current) setMouse(true);
    }
  });

  function handleVideoSliderChange (event, newValue){
    videoPlayer.current.currentTime = (newValue/100) * videoPlayer.current.duration;
  };

  function handleVolumeSliderChange (event, newValue){
    videoPlayer.current.volume = newValue/100;
    setVolume({
      value: newValue,
      mute: newValue === 0
    });
  };

  function onTimeUpdate(e){
    setProgress((videoPlayer.current.currentTime * 100)/videoPlayer.current.duration);
  }


  function togglePlay(){
    if (videoPlayer.current.paused){
      videoPlayer.current.play();
    }
    else{
      videoPlayer.current.pause();
    }
  }

  function toggleMute(){
    setVolume((initial)=>{
      return({
        mute: !initial.mute,
        value: initial.value
      });
    })
  }

  function ppIcon(){
    return (
      <IconButton onClick={togglePlay}>
        {!play ? <PlayArrowIcon/> : <PauseIcon/>}
      </IconButton>
    )
  }

  function volIcon(){
    return (
      <IconButton onClick={toggleMute}>
        {volume.mute ? <VolumeOffIcon/> : <VolumeUpIcon/>}
      </IconButton>
    )
  }

  function toggleFullscreen(){
    if (document.fullscreen){
      document.exitFullscreen();
    }
    else {
      videoPlayerContainer.current.webkitRequestFullScreen();
    }
  }

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <div ref={videoPlayerContainer} className={mouse ? classes.respectBox : classes.respectBoxHM}>
          <video 
            ref={videoPlayer}
            className={classes.video} 
            src={video.path}
            onPlay={()=>setPlay(true)}
            onPause={()=>setPlay(false)}
            onTimeUpdate={onTimeUpdate}
          />

          <Paper className={mouse ? classes.controlBar : classes.controlBarHM} elevation={3}>
            {ppIcon()}
            <Slider className={classes.sliderVid} value={progress} onChange={handleVideoSliderChange} />
            {volIcon()}
            <Slider className={classes.sliderVol} color="secondary"  value={volume.mute ? 0 : volume.value} onChange={handleVolumeSliderChange}/>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon/>
            </IconButton>
          </Paper>
        </div>
      </Container>
      <Container>
        <FormGroup row>
          <FormControlLabel
            control={<Switch checked={hosting} onChange={(e)=>setHosting(e.target.checked)} />}
            label="Host"
          />
        </FormGroup>
      </Container>
    </React.Fragment>
  );
}