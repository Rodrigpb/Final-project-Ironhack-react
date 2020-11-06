import React, { useEffect, useState } from 'react';
import { searchSpace } from '../../services/api.service';
import CardSpace from '../cardSpace/cardSpace';
import '../stylesheet/searchSpace.css';
import MapsDetail from '../mapsDetail';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@material-ui/core';
import { Typography } from 'antd';
import { MehOutlined, MenuOutlined, SmileTwoTone } from '@ant-design/icons';

const SearchSpace = ({ match }) => {
	const [ space, setSpace ] = useState(null);
	const [ markerSpace, setMarkerSpace ] = useState([]);
	const [ filterSearch, setFilterSearch ] = useState({
		type: [],
		service: []
	});
	const [spaceResult, setSpaceResult] = useState(undefined)
	const query = match.params.search;
	const containerStyle = {
		width: '100%',
		height: '100vh'
	};

	const servicesArray = [
		'Gestion de agencias',
		'Oficina Virtual',
		'Recepción de emails',
		'Sala de reuniones',
		'Recepción',
		'Pizarra/Flipchart',
		'TV',
		'Parking',
		'Cacina',
		'Catering',
		'Aire Acondicionado',
		'Domiciliación Fiscal',
		'Intert + WIFI',
		'Impresora',
		'Equipo de sonido',
		'Acceso 24/7',
		'Gestión de eventos',
		'Recepción de llamadas',
		'Recepción paquetería',
		'Secretaría',
		'Impresora',
		'Uso de Dirección',
		'Niños permitidos',
		'Coworking Visa',
		'Café de cortesía',
		'Fruta',
		'Alarma',
		'Domiciliación Social',
		'Mascotas permitidas',
		'Fotocopiadora',
		'Escáner'
	];

	useEffect(() => {
		const getSearch = async () => {
			const spaces = await searchSpace(query);
			setSpace(spaces);
			setSpaceResult(spaces)
			setMarkerSpace(
				spaces.map((space) => {
					return {
						lat: space.location.coordinates[0],
						lng: space.location.coordinates[1]
					};
				})
			);
		};

		getSearch();
	}, [query]);

	useEffect(() => {
		setSpaceResult(space?.filter(space => {
			return filterSearch.service.every(el => space.services.includes(el)) && filterSearch.type.every(el => el.includes(space.type[0]))
		}))
		if (spaceResult !== undefined) {
		setMarkerSpace(
			spaceResult.map((space) => {
				return {
					lat: space.location.coordinates[0],
					lng: space.location.coordinates[1]
				};
			})
		);
		}
		
	}, [filterSearch])

	const handleChange = (e) => {
		const { name, value} = e.target;

		setFilterSearch({
			...filterSearch,
			[name]: filterSearch[name].includes(value)
				? [ ...filterSearch[name].filter((service) => service !== value) ]
				: [ ...filterSearch[name].filter((service) => service !== value), value ]
		});
	};
	
	
	return (
		<div className="SearchSpace">
			<h1 className="text-center font-italic title">{`Espacios en ${query}`}</h1>
			<div className="container">
				<Accordion>
					<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
						<MenuOutlined />
						<Typography className="ml-2">Filtro</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<h6 className="title-search">Tipo de Espacio</h6>
									<button
										name="type"
										value="office"
										onClick={handleChange}
										className={
											filterSearch.type.includes('office') ? (
												'element-search selected'
											) : (
												'element-search '
											)
										}
									>
										Oficina completa
									</button>
									<button name="type" value="desk" onClick={handleChange} className={
											filterSearch.type.includes('desk') ? (
												'element-search selected'
											) : (
												'element-search '
											)
										}>
										Escritorio individual
									</button>
									<button
										name="type"
										value="meetingRoom"
										onClick={handleChange}
										className={
											filterSearch.type.includes('meetingRoom') ? (
												'element-search selected'
											) : (
												'element-search '
											)
										}
									>
										Sala de reuniones
									</button>
								</div>
								<div className="col-md-8">
									<h6 className="title-search">Servicios</h6>
									<div className="row">
										{servicesArray.map((service, index) => {
											return (
												<div className="col-md-4" key={index}>
													<FormControlLabel
														control={
															<Checkbox
																icon={<MehOutlined />}
																checkedIcon={<SmileTwoTone />}
																value={service}
																name="service"
																onChange={handleChange}
															/>
														}
														label={service}
													/>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
			<div className="container-space">
				{spaceResult === undefined ? (
					<div className="container">
						<div class="alert alert-warning mt-5 text-center" role="alert">
							Cargando...
						</div>
					</div>
				) : spaceResult.length === 0 ? (
					<div className="container">
						<h3 class="font-italic mt-5 text-center" role="alert">
							Upps.. No hay resultados de tu busqueda
						</h3>
					</div>
				) : (
					<div className="conainer-fluid">
						<div className="row">
							<div className="col-md-5">
								<MapsDetail
									containerStyle={containerStyle}
									marker={markerSpace}
									center={markerSpace[0]}
								/>
							</div>
							<div className="col-md-7">
								<div className="container">
									<div className="row cards-spaces">
										{spaceResult.map((space, i) => <CardSpace key={i} space={space} n={5}/>)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchSpace;
