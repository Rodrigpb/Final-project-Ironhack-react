import React from 'react';

const CardSpace = ({ space }) => {

	return (
		<div className="card-space">
			<img src={space.image[0]} alt={space.title} />
			<h3>{space.title}</h3>
			<hr />
			<div className="card-price">
				{space.type.office.quantity > 0 ? (
					<div>
						<div className="price-name"> Oficina </div>
						<div className="price">{space.type.office.price}</div>
						<div className="price-day">día </div>
					</div>
				) : (
					''
				)}
				{space.type.desk.quantity > 0 ? (
					<div>
						<div className="price-name"> Escritorios </div>
						<div className="price">{space.type.desk.price}</div>
						<div className="price-day">día</div>
					</div>
				) : (
					''
				)}
				{space.type.meetingRoom.quantity > 0 ? (
					<div>
						<div className="price-name"> Sala de reuniones </div>
						<div className="price">{space.type.meetingRoom.price}</div>
						<div className="price-day" >día</div>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default CardSpace;
