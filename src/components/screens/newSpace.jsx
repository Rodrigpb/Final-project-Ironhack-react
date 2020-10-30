import {Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { MehOutlined, SmileTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import '../stylesheet/newSpace.css';
import InputNumberWithLabel from '../inputNumberwithLabel';
import MapBar from '../searchAutocomplete';
import MyMap from '../googleMaps';
import Button from '../Button/Button'

const validations = {
	name: (value) => value.length > 1,
	files: (value) => value.length > 1,
	description: (value) => value.length > 25,
	service: (value) => value.length > 1,
	nº_de_oficinas: (value) => value.length > 1
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
	'Proyector',
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

const NewSpace = () => {
	const [ state, setState ] = useState({
		data: {
			name: '',
			files: [],
			description: '',
			service: [],
			direction: '',
			extraDirection: '',
			city: '',
			coordinates: { lat: 40.416775, lng: -3.70379 }
		},
		error: {
			name: true,
			files: true,
			description: true,
			direction: true,
			contributed_by: true
		},
		touch: {}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(state)
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		//const isValid = validations[name](value);

		setState({
			data: {
				...state.data,
				[name]:
					name === 'service'
						? e.target.checked
							? [ ...state.data.service.filter((service) => service !== value), value ]
							: [ ...state.data.service.filter((service) => service !== value) ]
						: files ? files : value
			},
			error: {
				...state.error
				//[name]: !isValid
			},
			touch: {
				...state.touch
			}
		});
		console.log(state);
	};

	const handlePlace = (place) => {
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
				direction: true
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

	return (
		<div className="NewSpace">
			<h2 className="text-center font-italic">Crear Espacio de Coworking</h2>
			<form onSubmit={handleSubmit}>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Información General</h5>
					<div className="row mt-5 ml-5">
						<div className="col-md-6 d-flex flex-column justify-content-between ">
							<TextField
								id="standard-basic"
								label="Nombre del Espacio *"
								name="name"
								onBlur={handleBlur}
								value={data.name}
								onChange={handleChange}
								helperText={`Quedan ${28 - data.name.length} caracteres`}
								inputProps={{ maxLength: 28 }}
								error={error.name && touch.name ? true : false}
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
						<div className="col-md-6">
							<MapBar onPlaceSelected={handlePlace} />
							<label>Piso, puerta, escalera, etc</label>
							<br />
							<input
								style={{
									width: '100%',
									height: '40px',
									paddingLeft: '16px',
									marginTop: '2px'
								}}
								type="text"
								name="extraDirection"
								value={data.extraDirection}
								onChange={handleChange}
							/>
						</div>
						<div className="col-md-6">
							<MyMap center={data.coordinates} />
						</div>
					</div>
				</div>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Caracteristicas</h5>
					<div className="row mt-5 ml-5">
						<div className="col-4">
							<InputNumberWithLabel
								type="number"
								label="nº de mesas"
								value={data.mesas || 0}
								onChange={handleChange}
								name="mesas"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="cantidad"
								value={data.mesasQuantity || 0}
								onChange={handleChange}
								name="mesasQuantity"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="precio"
								value={data.mesasPrice || 0}
								onChange={handleChange}
								name="mesasPrice"
							/>
						</div>
					</div>
					<div className="row mt-5 ml-5">
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="nº de oficinas"
								value={data.office || 0}
								onChange={handleChange}
								name="office"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="cantidad"
								value={data.officeQuantity || 0}
								onChange={handleChange}
								name="officeQuantity"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="precio"
								value={data.officePrice || 0}
								onChange={handleChange}
								name="officePrice"
							/>
						</div>
					</div>
					<div className="row mt-5 ml-5">
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="nº de sala de reuniones"
								value={data.meet || 0}
								onChange={handleChange}
								name="meet"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="cantidad"
								value={data.meetQuantity || 0}
								onChange={handleChange}
								name="meetQuantity"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="precio"
								value={data.meetPrice || 0}
								onChange={handleChange}
								name="meetPrice"
							/>
						</div>
					</div>
					<div className="row mt-5 ml-5">
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="Otros"
								value={data.meet || 0}
								onChange={handleChange}
								name="other"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="cantidad"
								value={data.otherQuantity || 0}
								onChange={handleChange}
								name="otherQuantity"
							/>
						</div>
						<div className="col-md-4">
							<InputNumberWithLabel
								type="number"
								label="precio"
								value={data.otherPrice || 0}
								onChange={handleChange}
								name="otherPrice"
							/>
						</div>
					</div>
				</div>
				<div className="container container-article">
					<h5 className="ml-4 mt-3 font-weight-bold">Horario</h5>
					<div className="row mt-5 ml-5" />
				</div>
				<Button type='submit' name='Crear Espacio'/>
				
			</form>
		</div>
	);
};

export default NewSpace;
