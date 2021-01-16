import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import ReactSwipableView from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import '../stylesheet/spaceDetail.css';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const AutoPlaySwipeableViews = autoPlay(ReactSwipableView);

const carouselPhotos = [
	{
		imgPath: '/images/carousel-1.jpg'
	},
	{
		imgPath: '/images/carousel-2.jpg'
	},
	{
		imgPath: '/images/carousel-3.jpg'
	}
];

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: '100vh'
	},
	img: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		width: '100vw',
		height: '100vh'
	},
	buttonStep: {
		alignItems: 'center',
		// marginTop : '-2em',
		zIndex: '1000',
		display: 'flex',
		justifyContent: 'center'
	}
}));

function Carousel() {
	const classes = useStyles();
	const theme = useTheme();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const maxSteps = carouselPhotos.length;
	const history = useHistory();
	const { user } = useAuthContext();

	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	const handleClick = () => {
		if (user) {
			return history.push(`/profile/${user.id}`);
		}
		history.push('/register');
	};

	return (
		<div className={`${classes.root} SpaceDetail`}>
			<div className="bg-wrapper">
				<AutoPlaySwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
				>
					{carouselPhotos.map((step, index) => (
						<div key={index}>
							{Math.abs(activeStep - index) <= 2 ? (
								<img className={classes.img} src={step.imgPath} alt={step.label} />
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
				<div className="bg-color" />
			</div>
			<MobileStepper
				className={classes.buttonStep}
				steps={maxSteps}
				position="static"
				variant="dots"
				activeStep={activeStep}
			/>
			<div className="container">
				<div className="text-wrap align-items-center">
					<h2 style={{ lineHeight: '1.5em', width: '80%' }}>Adáptate con el lugar de trabajo del mañana</h2>
					<Button name={user ? 'Ver perfil' : 'Registrate'} onClick={handleClick} />
				</div>
			</div>
		</div>
	);
}

export default Carousel;
