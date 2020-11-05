  
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ¡Enhorabuena!
        </Typography>
        <MailTwoTone />
        <Typography component="h1" variant="h5">
          Has finalizado el registo. Comprueba tu correo para verificar tu cuenta.
        </Typography>
        <Typography component="h1" variant="h5">
          Comprueba tu correo para verificar tu cuenta.
        </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            <Link href="/login">
                COntinuar
              </Link>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya eres usuario? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        
      </div>
    </Container>
  );
}