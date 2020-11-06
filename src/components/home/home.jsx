import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Carousel from './carousel';
import BackgroundVideo from './backgroundVideo';
import { spacesAll } from '../../services/api.service';
import CardSpace from '../cardSpace/cardSpace';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	// video: {
	//   height: '100%',
	//   width: '100%',
	//   display: 'flex',
	// },
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
	}
}));

const cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

export default function Home() {
	const classes = useStyles();
  const [ spaces, setSpaces ] = useState(null);
  
	useEffect(() => {
		const getSpace = async () => {
			const spaces = await spacesAll();
			setSpaces(spaces);
		};

		getSpace();
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />
			<Carousel />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							Album layout
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Something short and leading about the collection below—its contents, the creator, etc. Make
							it short and sweet, but not too short so folks don&apos;t simply skip over it entirely.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="contained" color="primary">
										Main call to action
									</Button>
								</Grid>
								<Grid item>
									<Button variant="outlined" color="primary">
										Secondary action
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
					{/* End hero unit */}
				
            <div className='container'>
              <div className='row cards-spaces'>
              
                {spaces?.map((space, i) => <CardSpace key={i} space={space} n={4} />)}
    
              </div>
            </div>
			

			</main>

			<Container>
				<BackgroundVideo />
			</Container>

			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
				</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
