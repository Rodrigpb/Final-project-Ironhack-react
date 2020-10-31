import React from 'react';
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px'
};

function MyMap(props) {
	return (
		
			<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API} libraries={[ 'places' ]}>
				<div className="col-md-6">
					<Autocomplete
						onPlaceChanged={props.onPlaceSelected}
						types={[ 'address' ]}
						restrictions={{ country: 'es' }}
						onLoad={props.onLoad}
					>
						<input
							type="text"
							placeholder="Introduce la dirección"
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '15px'
							}}
						/>
					</Autocomplete>
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
						value={props.valueInput}
						onChange={props.onChange}
					/>
				</div>
				<div className="col-md-6">
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={props.center}
						zoom={15}
						//onLoad={onLoad}
						onUnmount={props.onUnmount}
					>
						{props.marker ? (
							props.marker.map((marker) => {
								return (
									<Marker
										key={marker.id}
										// onClick={onClick}
										position={marker}
									/>
								);
							})
						) : (
							<Marker position={props.center} />
						)}
					</GoogleMap>
				</div>
			</LoadScript>

	);
}

export default React.memo(MyMap);
