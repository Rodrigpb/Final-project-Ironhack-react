import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { MehOutlined, SmileTwoTone } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import '../stylesheet/newSpace.css';
import InputNumberWithLabel from '../inputNumberwithLabel';
import MyMap from '../Maps/googleMaps';
import Button from '../Button/Button';
import { newSpace } from '../../services/api.service';
import { useHistory } from 'react-router-dom';

const validations = {
	title: (value) => value.length > 1,
	files: (value) => value.length > 1,
	description: (value) => value.length > 25,
	service: (value) => value.length > 1,
	schedule: (value) => value.length > 1,
	direction: (value) => value.length > 1,
	price: (value) => value > 1,
	quantity: (value) => value > 1,
	type: (value) => value.length > 1,
	scheduletype: (value) => value.length > 2
};

const services = [
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

const NewSpace = (props) => {
	const [ state, setState ] = useState({
		data: {
			title: '',
			files: [],
			description: '',
			service: [],
			direction: '',
			extraDirection: '',
			city: '',
			coordinates: { lat: 40.416775, lng: -3.70379 },
			type: '',
			quantity: 0,
			price: 0,
			schedule: [],
			scheduletype: '',
			timeEntry: '08:30',
			timeExit: '18:30'
		},
		error: {
			title: true,
			files: true,
			description: true,
			service: true,
			schedule: true,
			direction: true,
			price: true,
			quantity: true,
			type: true,
			scheduletype: true
		},
		touch: {}
	});
	const [ map, setMap ] = useState(null);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		const Space = async () => {
			try {
				const space = await newSpace(state.data);
				history.push(`/space/${space.id}`);
			} catch (e) {
				console.log(e);
			}
		};
		Space();
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		const isValid = validations.hasOwnProperty(name) ? validations[name](value) : '';

		setState({
			data: {
				...state.data,
				[name]:
					name === 'service' || name === 'schedule'
						? e.target.checked
							? [ ...state.data[name].filter((service) => service !== value), value ]
							: [ ...state.data[name].filter((service) => service !== value) ]
						: files ? files : value
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

	const onLoad = useCallback(function callback(map) {
		// const bounds = new window.google.maps.LatLngBounds();
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	const handlePlace = () => {
		const place = map.getPlace();
		const address = place.formatted_address;
		const city = place.address_components[2].long_name;
		const latValue = place.geometry.location.lat();
		const lngValue = place.geometry.location.lng();

		setState({
			data: {
				...state.data,
				direction: address,
				city: city,
				coordinates: { lat: latValue, lng: lngValue }
			},
			error: {
				...state.error,
				direction: false
			},
			touch: {
				...state.touch,
				direction: true
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
		<div className="NewSpace">
			<h2 className="text-center font-italic mt-5">Crear Espacio de Coworking</h2>
			<form onSubmit={handleSubmit}>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Información General</h5>
					<div className="row mt-5 ml-5">
						<div className="col-md-6 d-flex flex-column justify-content-between ">
							<TextField
								id="standard-basic"
								label="Nombre del Espacio *"
								name="title"
								onBlur={handleBlur}
								value={data.title}
								onChange={handleChange}
								helperText={`Quedan ${28 - data.title.length} caracteres`}
								inputProps={{ maxLength: 28 }}
								error={error.title && touch.title ? true : false}
							/>
							<div className="mb-3">
								<h6>Sube las imágenes de tu espacio</h6>
								<input type="file" onChange={handleChange} name="files" multiple />
							</div>
						</div>
						<div className="col-md-5 d-flex flex-column">
							<TextField
								id="standard-multiline-static"
								name="description"
								label="Descripción *"
								multiline
								rows={8}
								cols={20}
								onBlur={handleBlur}
								value={data.description}
								onChange={handleChange}
								helperText={`Quedan ${1500 - data.description.length} caracteres`}
								inputProps={{ maxLength: 1500 }}
								error={error.description && touch.description ? true : false}
							/>
						</div>
					</div>
				</div>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Servicios</h5>
					<div className="row mt-5 ml-5">
						{services.map((service, index) => {
							return (
								<div className="col-md-6" key={index}>
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
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Dirección</h5>
					<div className="row mt-5 ml-5">
						<MyMap
							center={data.coordinates}
							onPlaceSelected={handlePlace}
							onChange={handleChange}
							valueInput={data.extraDirection}
							onLoad={onLoad}
							onUnmount={onUnmount}
						/>
					</div>
				</div>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Caracteristicas</h5>
					<div className="row mt-5 ml-5">
						<h6>Horario</h6>
					</div>
					<div className="row mt-1 ml-5">
						<FormControlLabel
							value="Lunes"
							control={<Checkbox color="primary" />}
							label="Lu"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Martes"
							control={<Checkbox color="primary" />}
							label="Ma"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Miercoles"
							control={<Checkbox color="primary" />}
							label="Mi"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Jueves"
							control={<Checkbox color="primary" />}
							label="Ju"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Viernes"
							control={<Checkbox color="primary" />}
							label="Vi"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Sabado"
							control={<Checkbox color="primary" />}
							label="Sa"
							labelPlacement="top"
							className="schedule"
							onChange={handleChange}
							name="schedule"
						/>
						<FormControlLabel
							value="Domingo"
							control={<Checkbox color="primary" />}
							onChange={handleChange}
							name="schedule"
							label="Do"
							labelPlacement="top"
							className="schedule"
						/>
					</div>
					{data.schedule.length > 0 ? (
						<div className="row mt-2 ml-5">
							<FormControl className="form-select">
								<InputLabel id="demo-simple-select-label">Turno de apertura</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={data.scheduletype}
									name="scheduletype"
									onChange={handleChange}
									onBlur={handleBlur}
								>
									<MenuItem value={'Mañana'}>Horario de mañana</MenuItem>
									<MenuItem value={'Tarde'}>Horario de tarde</MenuItem>
									<MenuItem value={'Todo el día'}>Todo el día</MenuItem>
								</Select>
							</FormControl>
							<FormControl className="form-select">
								<TextField
									id="time"
									label="Entrada"
									type="time"
									value={data.timeEntry}
									onChange={handleChange}
									name="timeEntry"
								/>
							</FormControl>
							<FormControl className="form-select">
								<TextField
									id="time"
									label="Salida"
									type="time"
									onChange={handleChange}
									name="timeExit"
									value={data.timeExit}
								/>
							</FormControl>
						</div>
					) : (
						''
					)}
					<div className="row mt-5 ml-5">
						<h6>Espacio</h6>
					</div>

					<div className="row mt-1 ml-5">
						<FormControl className="form-select">
							<InputLabel id="demo-simple-select-label">Tipo de espacio</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={data.type}
								name="type"
								onChange={handleChange}
								onBlur={handleBlur}
								error={error.type && touch.type ? true : false}
							>
								<MenuItem value={'office'}>Oficina completa</MenuItem>
								<MenuItem value={'desk'}>Escritorio</MenuItem>
								<MenuItem value={'meetingRoom'}>Sala de reuniones</MenuItem>
							</Select>
						</FormControl>
						{data.type !== '' ? (
							<div>
								<TextField
									className="form-select"
									id="standard-basic"
									label="Capacidad de personas"
									type="number"
									name="quantity"
									onChange={handleChange}
									onBlur={handleBlur}
									value={data.quantity}
									error={error.quantity && touch.quantity ? true : false}
								/>

								<TextField
									className="form-select"
									id="standard-basic"
									label={data.type === 'desk' ? 'Precio por persona/día' : 'Precio por día'}
									type="number"
									name="price"
									onBlur={handleBlur}
									onChange={handleChange}
									value={data.price}
									error={error.price && touch.price ? true : false}
								/>
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<Button
					disable={isError}
					type="submit"
					name="Crear Espacio"
					className={isError ? 'button disable' : 'button'}
				/>
			</form>
		</div>
	);
};

export default NewSpace;
