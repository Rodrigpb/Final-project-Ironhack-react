import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="/">
				You Work
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
  },
  title: {
    color: '#b1b1b1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: '600',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  link: {
    color: '#000',
    fontWeight: '400',
    padding: '0.1'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
		<React.Fragment>
				
			{/* Footer */}
			<footer className={classes.footer}>
      <Grid container spacing={2} >
			<Grid item xs={12} sm={4} className={classes.list}>
      <ListItem className={classes.title}>
            ESPACIOS
      </ListItem>
      <List component="nav" >
        <ListItem className={classes.link}>
          <Link color="inherit" href="/" >
            Epacios de coworking
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Centro de negocio
          </Link>
      </ListItem  >
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Despachos flexibles
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Despachos privados
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Hot desk
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Oficinas compartidas
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Sala de reuniones
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Sala para eventos
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Consultoria coworking
          </Link>
      </ListItem>
        </List>
			</Grid>
      <Grid item xs={12} sm={4} className={classes.list}>
      <ListItem className={classes.title}>
            COWORKING SPAIN
      </ListItem>
      <List component="nav" >
        <ListItem className={classes.link}>
            <Link color="inherit" href="/">
              Contacto
            </Link>
        </ListItem>
        <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Preguntas frecuentes
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Legal
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Magazine
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Prensa y Logos
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Nosotros
          </Link>
      </ListItem>
      <ListItem className={classes.link}>
          <Link color="inherit" href="/">
            Documentos
          </Link>
      </ListItem>
        </List>
			</Grid>
      <Grid item xs={12} sm={4} className={classes.list}>
      <ListItem className={classes.title}>
            CIUDADES TOP
      </ListItem>
        <List component="nav" >
          <ListItem className={classes.link}>
              <Link color="inherit" href="/">
                Madrid
              </Link>
          </ListItem>
          <ListItem className={classes.link}>
            <Link color="inherit" href="/">
              Valencia
            </Link>
        </ListItem>
        <ListItem className={classes.link}>
            <Link color="inherit" href="/">
              Málada
            </Link>
        </ListItem>
        <ListItem className={classes.link}>
            <Link color="inherit" href="/">
              Toledo
            </Link>
        </ListItem>
          </List>
        </Grid>
      </Grid>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}