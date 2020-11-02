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

const SpaceDetail = ({ match }) => {
	const [ space, setSpace ] = useState(null);
	const [ comment, setComment ] = useState(null);
	const [ submitting, setSubmitting ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ change, setChange ] = useState(false);
	const spaceId = match.params.id;

	useEffect(
		() => {
			const showSpace = async () => {
				try {
					const space = await getSpace(spaceId);
					setSpace(space);
				} catch (e) {
					setError(e);
				}
			};
			showSpace();
		},
		[ change ]
	);

	const onChange = (e) => {
		setComment(e.target.value);
	};

	const onSubmit = () => {
		setSubmitting(true);

		const sendComment = async () => {
			try {
				await newComment(spaceId, comment);
				setSubmitting(false);
				change === false ? setChange(true) : setChange(false);
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
				change === false ? setChange(true) : setChange(false);
			} catch (e) {
				setError(e);
			}
		};

		deleteC();
	};

	return (
		<div className="SpaceDetail">
			{space === null ? (
				<div className="text-center">
					<CircularProgress />
				</div>
			) : (
				<div>
					<div className="bg-space" style={{ background: `url(${space.image[0]})` }} />
					{/* <div className='test'>
						<img className="bg-space" src={space.image[0]} alt={space.title} /> */}
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
						<div className="h5 mt-3 mb-5 font-weight-bold">
							Evaluaciones {space.reviews.length > 1 ? `(${space.reviews.length})` : ''}
							<span className='ml-5'>
								<Reviews spaceId={space.id} />
							</span>
						</div>

						<div className="row">
							<div className="col-md-6">
								<Ratingbar
									label="limpieza"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.clean, 0) /
										space.reviews.length
									}
								/>
								<Ratingbar
									label="veracidad"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.veracity, 0) /
										space.reviews.length
									}
								/>
								<Ratingbar
									label="comunicación"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.communication, 0) /
										space.reviews.length
									}
								/>
							</div>
							<div className="col-md-6">
								<Ratingbar
									label="localización"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.location, 0) /
										space.reviews.length
									}
								/>
								<Ratingbar
									label="llegada"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.arrival, 0) /
										space.reviews.length
									}
								/>
								<Ratingbar
									label="servicios"
									percent={
										space.reviews.reduce((acum, val) => acum + val.rating.services, 0) /
										space.reviews.length
									}
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
				</div>
			)}
		</div>
	);
};

export default SpaceDetail;
