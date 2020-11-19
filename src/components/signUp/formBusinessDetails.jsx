import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './signUp.css'


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
	disable: {
		opacity: 0.5
	},
	h1: {
		color: '#132651',
		fontStyle: 'italic'
	}
}));

export default function FormBusinessDetails(props) {
	const classes = useStyles();

	const { handleChange, handleBlur, disable, handleSubmit } = props;
	const { data, error, touch, errorMessage } = props.value;

	const backward = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	const fordward = (e) => {
		e.preventDefault();
		props.nextStep();
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Link to="/">
					<img src="/images/logo.png" alt="logo" className="logo" />
				</Link>
				<h3 className={classes.h1}>Datos profesionales</h3>
				{errorMessage.error && (
							<div className="container">
								<div className="alert alert-danger text-center" role="alert">
									{errorMessage.message}
								</div>
							</div>
						)}
				<form className={classes.form}>
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
          <div className='mt-3'>
					<Button
						xs={12}
						sm={6}
						className= 'submit-button mr-3'
						type="submit"
						variant="contained"
						onClick={backward}
					>
						Atrás
					</Button>
					<Button
						xs={12}
						sm={6}
						type="submit"
						variant="contained"
						disabled={disable}
						className={disable ? classes.disable : `submit-button`}
						onClick={handleSubmit}
					>
						Confirmar
					</Button>
          </div>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2" style={{ color: '#132651' }}>
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
