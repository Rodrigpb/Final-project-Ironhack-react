import React from 'react';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  video: {
    height: '100vh',
    backgroundImage: 'url(images/cink_castellana_4.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: '10em'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default  function BackgroundVideo()  {

    const classes = useStyles();

    const opts = {
      // height: '390',
      // width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    
 
    return (
      <Grid container component="main" className={classes.root}>
        <YouTube 
          videoId="hywVgqbSQ-8" 
          opts={opts} 
          //onReady={onReady}
          className={classes.video} 
          />
      </Grid>
      )
  }

