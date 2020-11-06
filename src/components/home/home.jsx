import React, { useEffect, useState } from 'react';
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

import { Card, Col, List, Row } from 'antd';
import './home.css';
import ExportTypography from 'antd/lib/typography/Typography';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import Footer from './footer'


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
	const [ element, setElement ] = useState(14);

	useEffect(() => {
		const getSpace = async () => {
			const spaces = await spacesAll();
			setSpaces(spaces);
		};

		getSpace();
	}, []);

	const handleClickMore = () => {
		setElement(element + 15);
		window.dispatchEvent(new Event('resize'));
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Carousel />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<div className="container" >
						<Typography component="h6" variant="h4" align="center" color="textPrimary" gutterBottom>
							Cómo puede ayudar YouWork a tu empresa a avanzar
						</Typography>
						<div className="site-card-wrapper mt-5">
							<div className="row">
								<div className="col-md-4 d-flex justify-content-center">
									<Card
										hoverable
										style={{ width: 360 }}
										cover={<img alt="covid" src="/images/home-1.jpg" />}
									>
										<h6>Da prioridad a la salud y a la seguridad</h6>
										<p>
											Hemos modificado nuestros espacios para garantizar el distanciamiento,
											mejorado los procesos de desinfección y actualizado nuestros sistemas de
											climatización para darte más tranquilidad en la oficina.
										</p>
									</Card>
								</div>
								<div className="col-md-4 d-flex justify-content-center">
									<Card
										hoverable
										style={{ width: 360 }}
										cover={<img alt="covid" src="/images/home-2.jpg" />}
									>
										<h6>Da prioridad a la salud y a la seguridad</h6>
										<p>
											Hemos modificado nuestros espacios para garantizar el distanciamiento,
											mejorado los procesos de desinfección y actualizado nuestros sistemas de
											climatización para darte más tranquilidad en la oficina.
										</p>
									</Card>
								</div>
								<div className="col-md-4 d-flex justify-content-center">
									<Card
										hoverable
										style={{ width: 360 }}
										cover={<img alt="covid" src="/images/home-3.jpg" />}
									>
										<h6>Da prioridad a la salud y a la seguridad</h6>
										<p>
											Hemos modificado nuestros espacios para garantizar el distanciamiento,
											mejorado los procesos de desinfección y actualizado nuestros sistemas de
											climatización para darte más tranquilidad en la oficina.
										</p>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* End hero unit */}

				<div className="container" name="start-spaces" id="start-spaces">
					{spaces !== null && (
						<div className="row cards-spaces mb-5">
							<h3 className="mt-5 mb-5"> Encuentra tu espacio perfecto</h3>

							<List
								grid={{ column: 3, xs: 1, sm: 1, md: 2 }}
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										const a = document.createElement('a')
										a.href='#start-spaces'
										a.click()
									},
									pageSize: 15
								}}
								dataSource={spaces}
								footer={
									<div>
										<b>You work!</b>
									</div>
								}
								renderItem={(item, i) => (
									<List.Item>
										<CardSpace key={i} space={item} n={12} />
									</List.Item>
								)}
							/>
						</div>
					)}
				</div>
				
			</main>

			<Container>
				<BackgroundVideo />
			</Container>
			<Footer/>
		</React.Fragment>
	);
}
