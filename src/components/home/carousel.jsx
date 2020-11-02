import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const carouselPhotos = [
  {
    imgPath:
      'https://www.emprendedores.es/wp-content/uploads/2020/04/coworking-1587455610-1024x683.jpg',
  },
  {
    imgPath:
    'https://cdn.ticbeat.com/src/uploads/2018/12/popularidad-coworking.jpg'
  },
  {
    imgPath:
    'https://media-exp1.licdn.com/dms/image/C511BAQEXHKNYTCqHWw/company-background_10000/0?e=2159024400&v=beta&t=MVZmuiJlxT7qmKCPPXOmbRWM-ST-SGt6sLzF-YauzsQ'
  },
  {
    imgPath:
      'https://rt00.epimg.net/retina/imagenes/2018/07/30/tendencias/1532946509_997689_1532948816_noticia_normal.jpg',
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
    width: '100vw',
    height: '100vh'
  },
}));

function Carousel() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = carouselPhotos.length;

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
        {carouselPhotos.map((step, index) => (
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
        variant="dots"
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