  
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        You Work
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 3, 2),
  },
  disable: {
    margin: theme.spacing(3, 3, 2),
    opacity: .5,
  }
}));

export default function FormBusinessDetails(props) {
  const classes = useStyles();

  const { handleChange, handleBlur, disable } = props;
  const {data, error, touch,} = props.value
  
  const backward = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const fordward = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Datos profesionales
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="number"
                type="tel"
                value={data.number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.number && touch.number ? true : false}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Numero de teléfono"
                autoFocus
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="razonSocial"
                label="Razón Social"
                name="razonSocial"
                value={data.razonSocial}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="nif"
                label="NIF"
                name="nif"
                value={data.nif}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="direccion"
                label="Domicilio Fiscal"
                name="direccion"
                value={data.direccion}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            item xs={12} sm={6}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            onClick={backward}
          >
            Atrás
          </Button>
            <Button
              item xs={12} sm={6}
              className={classes.submit}
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
              className={disable ? classes.disable : classes.submit}
              onClick={fordward}
            >
              Confirmar
            </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya eres usuario? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  }