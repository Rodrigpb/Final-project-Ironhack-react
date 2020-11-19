import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './signUp.css'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(18),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
  h1: {
    color: '#132651',
    fontStyle: 'italic'
  }
}));

export default function FormUserDetails(props) {
	const classes = useStyles();

	const fordward = (e) => {
    e.preventDefault();
		props.nextStep();
	};

	const { handleChange, handleBlur } = props;
	const { data, error, touch } = props.value;

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Link to="/">
					<img src="/images/logo.png" alt="logo" className="logo" />
				</Link>
				<h3 className={classes.h1}>
					Registro de nuevo usuario
          </h3>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								value={data.firstName}
								onChange={handleChange}
								onBlur={handleBlur}
								error={error.firstName && touch.firstName ? true : false}
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Nombre"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Apellido"
								name="lastName"
								value={data.lastName}
								onChange={handleChange}
								onBlur={handleBlur}
								error={error.lastName && touch.lastName ? true : false}
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Correo electrónico"
								name="email"
								value={data.email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={error.email && touch.email ? true : false}
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								value={data.password}
								onChange={handleChange}
								onBlur={handleBlur}
								error={error.password && touch.password ? true : false}
								label="Contraseña"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Button
						className='submit-button mt-3'
						type="submit"
						variant="contained"
						onClick={fordward}
					>
						Continuar
					</Button>
					<Grid container justify="flex-end">
						<Grid>
							<Link href="/login" variant="body2" style={{color:'#132651'}}>
								¿Ya eres usuario? Inicia sesión
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
