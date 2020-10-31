import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png',
  },
  {
    imgPath:
    'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/08/15863374252712.jpg'
  },
  {
    imgPath:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/113AC/production/_113427507_solar_orbiter_eui-fullsun01.jpg'
  },
  {
    imgPath:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQafW4xEyCctVR93QOaGoE-b9jdXAgEJAJbDg&usqp=CAU',
  },
  {
    imgPath:
      'https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg',
  },
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
  },
}));

function Carousel() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}> 
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label} >
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default Carousel;