import React, {useState} from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from '../../contexts/AuthContext';
import {Login} from '../../services/api.service';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Work
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
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
    backgroundColor: '#132651' ,
    margin: theme.spacing(3, 0, 2),
  },
}));

const validations = {
  password: (value) => value.length > 1,
  email: (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}


//Función de Login
export default function LogIn() {
  const classes = useStyles();
   const {login} = useAuthContext()
  console.log(login)

  const [ state, setState ] = useState({
    data: {
      email: '',
      password: ''
    },
    error: {
      email: true,
      password: true
    },
    touch: {}
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hola")

    const User = async () => {
      try {
        const user = await Login(state.data)
        login(user)
      } catch (e) {
        console.log(e);
      }
    };
    User();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validations.hasOwnProperty(name) ? validations[name](value) : '';
    
    setState({
			data: {...state.data, [name]: value
			},
			error: {
				...state.error,
				[name]: isValid !== '' && !isValid
			},
			touch: {
				...state.touch
			}
		});
  };

  const handleBlur = (e) => {
		const { name } = e.target;
		setState({
			...state,
			touch: {
				...state.touch,
				[name]: true
			}
		});
	};


  const { data, error, touch } = state;
  const isError = Object.values(error).some((el) => el);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link href="/" >
            <img src="/images/logo.png" alt="logo" className={classes.avatar}/>
          </Link> 
          
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              // onBlur={handleBlur}
							value={data.email}
              onChange={handleChange}
              //error={error.email && touch.email ? true : false}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              // onBlur={handleBlur}
							value={data.password}
              onChange={handleChange}
              //error={error.password && touch.password ? true : false}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="#132651" />}
              label="No me olvides"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // disable={isError}
              
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Has olvidado la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}