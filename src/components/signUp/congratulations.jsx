  
import React from 'react';
import { useHistory } from 'react-router-dom';import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MailTwoTone } from '@ant-design/icons'
import Button from '../Button/Button'
import { Result } from 'antd';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Congratulations(props) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
      console.log("Holla")
      history.push("/login")
  }
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Result status="success"/>,
        <Typography component="h1" variant="h5">
          ¡Enhorabuena!
        </Typography>
        <Typography component="h1" variant="h5">
          Has finalizado el registo.
        </Typography>
        <MailTwoTone className={classes.avatar} />
        <Typography component="h1" variant="h5" align="center">
          Comprueba tu correo para verificar tu cuenta.
        </Typography>
          <Button 
          name="Inicia sesión"
          onClick={onClick}
          />
          <Grid container justify="flex-end">
            
          </Grid>
        
      </div>
    </Container>
  );
}