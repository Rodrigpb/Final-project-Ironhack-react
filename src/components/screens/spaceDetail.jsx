import { CircularProgress } from '@material-ui/core';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteComment, getSpace, newComment } from '../../services/api.service';
import MapsDetail from '../mapsDetail';
import Ratingbar from '../ratingbar';
import Comments from '../comments';
import '../stylesheet/spaceDetail.css';
import NewComment from '../newComment';
import Reviews from '../reviews';
import { StarTwoTone } from '@ant-design/icons';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';

const SpaceDetail = ({ match }) => {
	const [ space, setSpace ] = useState(null);
	const [ comment, setComment ] = useState(null);
	const [ submitting, setSubmitting ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ change, setChange ] = useState(false);
	const spaceId = match.params.id;
	const [ startDate, setStartDate ] = useState(null);
	const [ endDate, setEndDate ] = useState(null);
	const [ excludeDates, setExcludeDates ] = useState([]);
	const [ dayOpen, setDayOpen ] = useState([]);
	const [ services, setServices ] = useState(10);
	const [ total, setTotal ] = useState(null);

	useEffect(
		() => {
			const showSpace = async () => {
				try {
					const space = await getSpace(spaceId);
					setSpace(space);
					console.log(space);
				} catch (e) {
					setError(e);
				}
			};
			showSpace();
		},
		[ change ]
	);

	useEffect(
		() => {
			if (space !== null) {
				const exclude = [];
				space.bookings.map((booking) => booking.dates.map((d) => exclude.push(d)));
				let d = null;
				const daysOpen = space.schedule.day.map((el) => {
					el === 'Domingo' && (d = 0);
					el === 'Lunes' && (d = 1);
					el === 'Martes' && (d = 2);
					el === 'Miercoles' && (d = 3);
					el === 'Jueves' && (d = 4);
					el === 'Viernes' && (d = 5);
					el === 'Sabado' && (d = 6);
					return d;
				});
				setExcludeDates(exclude);
				setDayOpen(daysOpen);
			}
		},
		[ space ]
	);


	useEffect(() => {
		if (startDate !== null && endDate !== null) {
			setTotal(space.price * (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
		}
	}, [startDate, endDate])

	const onChange = (e) => {
		setComment(e.target.value);
	};

	const onChangeDates = (dates) => {
		const [ start, end ] = dates;
		setStartDate(start);
		setEndDate(end);
		
		
	};

	const onSubmit = () => {
		setSubmitting(true);

		const sendComment = async () => {
			try {
				await newComment(spaceId, comment);
				setSubmitting(false);
				setChange(!change);
				setComment(null);
			} catch (e) {
				setError(e);
			}
		};

		sendComment();
	};

	const handleDelete = (id) => {
		const deleteC = async () => {
			try {
				await deleteComment(id);
				setChange(!change);
			} catch (e) {
				setError(e);
			}
		};

		deleteC();
	};

	const isWeekday = (date) => {
		const day = date.getDay();
		const dateNow = new Date();
		dateNow.setDate(dateNow.getDate() - 1);

		return date > dateNow && dayOpen.includes(day) && !excludeDates.includes(date);
	};


	return (
		<div className="SpaceDetail" style={{ marginTop: '80px' }}>
			{space === null ? (
				<div className="text-center">
					<CircularProgress />
				</div>
			) : (
				<div>
					<div className="bg-wrapper">
						<div className="bg-space" style={{ background: `url(${space.image[0]})` }} />
						<div className="bg-color" />
					</div>
					<div className="container">
						<div className="text-wrap">
							<h2>{space.title}</h2>
							<div className="price mt-5 col-md-3">
								<div className="type">
									{(space.type[0] === 'office' ? 'Oficina Completa' : '') ||
										(space.type[0] === 'desk' && 'Escritorio individual') ||
										(space.type[0] === 'meetingRoom' && 'Sala de reuniones')}
								</div>
								<div>{space.price} € / día</div>
							</div>
						</div>
					</div>
					<div className="wrap">
						{space.image.map((image, i) => {
							return <Image width={200} src={image} alt={`${space.title}${i}`} height={200} />;
						})}
					</div>
					<div className="container mt-5">
						<div className="row">
							<div className="col-md-6">{space.description}</div>
							<div className="col-md-6">
								<MapsDetail
									center={{ lat: space.location.coordinates[0], lng: space.location.coordinates[1] }}
								/>
								<div className="contact-detail mt-3">
									<div>{space.location.direction}</div>
									<div>{space.location.city}</div>
									<div>
										<b>HORARIO</b>
										{space.location.direction}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid mt-5 mb-5 gray">
						<div className="container pt-5 pb-5">
							<h5 className="mt-3 mb-5 font-weight-bold">Servicios</h5>
							<div className="row">
								{space.services.map((service, i) => {
									return (
										<div key={i} className="col-md-6 mt-3 service">
											{service}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="container pt-5 pb-5">
						<div className="h5 mt-3 mb-5 font-weight-bold d-flex align-items-center">
							<span className="d-flex align-items-center">
								{' '}
								<StarTwoTone twoToneColor="#D1A617" />
							</span>
							{space.reviews.length > 1 ? (
								`${(space.reviews.reduce((acum, val) => acum + val.rating.generalExperience, 0) *
									2 *
									10 /
									space.reviews.length).toFixed(1)}  `
							) : (
								0
							)}{' '}
							( {space.reviews.length > 1 ? `${space.reviews.length}` : 0} Evaluaciones)
							<span className="ml-5">
								<Reviews spaceId={space.id} setchange={setChange} change={change} />
							</span>
						</div>

						<div className="row">
							<div className="col-md-6">
								<Ratingbar
									label="limpieza"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.clean, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
								<Ratingbar
									label="veracidad"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.veracity, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
								<Ratingbar
									label="comunicación"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.communication, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
							</div>
							<div className="col-md-6">
								<Ratingbar
									label="localización"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.location, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
								<Ratingbar
									label="llegada"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.arrival, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
								<Ratingbar
									label="servicios"
									percent={(space.reviews.reduce((acum, val) => acum + val.rating.services, 0) *
										10 /
										space.reviews.length).toFixed(2)}
								/>
							</div>
						</div>
						<div className="row mt-4 ml-3">
							<Comments data={space.comments} handleDelete={handleDelete} />
						</div>

						<NewComment
							comment={comment}
							onChange={onChange}
							onSubmit={onSubmit}
							spaceId={space.id}
							error={error}
							submitting={submitting}
						/>
					</div>
					<div className="container-fluid gray">
						<div className="container pt-5 pb-5">
							
							<div className="h5 mt-3 mb-5 ml-4 font-weight">
								{startDate === null ? (
									'Seleciona la fecha de entrada'
								) : endDate === null ? (
									'Selecciona la fecha de salida'
								) : (
									`${(endDate.getTime() - startDate.getTime()) /
										(1000 * 60 * 60 * 24)} días en ${space.title}`
								)}
								<small className="ml-3 mt-1 font-weight-light text-muted d-block">
									{startDate !== null &&
										endDate !== null &&
										`${startDate.getDay() + 1} de ${startDate.toLocaleString('default', {
											month: 'short'
										})} de ${startDate.getFullYear()} - ${endDate.getDay() +
											1} de ${endDate.toLocaleString('default', {
											month: 'short'
										})} de ${endDate.getFullYear()}`}
								</small>
							</div>

							<div className="row">
								<div className="col-md-12 d-flex justify-content-center">
									<DatePicker
										onChange={onChangeDates}
										startDate={startDate}
										endDate={endDate}
										monthsShown={2}
										filterDate={isWeekday}
										selectsRange
										inline
									/>
									<div className="card-price">
										<div className='price'> {space.price}€/dia</div>
										<div className='d-flex'>
										<div className='d-flex flex-column justify-content-center text-center'>
										<span>Entrada</span>
											<small className='font-weight-light text-muted'>
												
												{startDate !== null &&
													`${startDate.getDay() +
														1} de ${startDate.toLocaleString('default', {
														month: 'short'
													})} de ${startDate.getFullYear()}`}
											</small>
											</div>
											<div className='d-flex flex-column justify-content-center text-center ml-3'>
											<span>Salida</span>
											<small className='font-weight-light text-muted d-block'>
												
												{endDate !== null &&
													`${endDate.getDay() + 1} de ${endDate.toLocaleString('default', {
														month: 'short'
													})} de ${endDate.getFullYear()}`}
											</small>
											</div>
										</div>
										<Button />
										<div>
											<div>
												{startDate !== null &&
													endDate !== null &&
													`${space.price} x ${(endDate.getTime() - startDate.getTime()) /
														(1000 * 60 * 60 * 24)} días`}
												<span>
													{startDate !== null &&
														endDate !== null &&
														`${total} €`}{' '}
												</span>
											</div>
											<div>
												{startDate !== null && endDate !== null && `Gastos de servicio`}
												<span>
													{startDate !== null && endDate !== null && `${services} €`}{' '}
												</span>
											</div>
											<div>
												{startDate !== null && endDate !== null && `Total`}
												<span>
													{startDate !== null && endDate !== null && `${services + total} €`}{' '}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SpaceDetail;
