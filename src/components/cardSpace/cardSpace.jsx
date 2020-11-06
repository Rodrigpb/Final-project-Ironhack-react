import React from 'react';
import { Link } from 'react-router-dom';
import './cardSpace.css';

const CardSpace = ({ space, n }) => {
	return (
		<div className={`col-lg-${n} card-space`}>
			<Link className="not-link" to={`/space/${space.id}`}>
				<img className='img-card-space' src={space.image[0]} alt={space.title} width="100%" />
				<h5 className="mt-2 mb-2">{space.title}</h5>
				<div className="card-price-container">
					<div className="price-name">
						{(space.type[0] === "office" ? 'Oficina completa' : "") ||
							(space.type[0] === 'desk' && 'Escritorios individuales') ||
							(space.type[0] === 'meetingRoom' && 'Sala de reuniones')}{' '}
					</div>
					<div className="price">{space.price} € / día </div>
					<div className="type-day">
						{space.schedule.available === 'Todo el día' ? (
							space.schedule.available
						) : (
							`Turno de ${space.schedule.available}`
						)}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CardSpace;
