import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



function MapsDetail(props) {
    const [map, setMap] = useState(null)


    const onLoad = useCallback(function callback(map) {
		// const bounds = new window.google.maps.LatLngBounds();
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);


	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
			<GoogleMap
				mapContainerStyle={props.containerStyle}
				center={props.center}
				zoom={15}
				//onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{props.marker ? (
					props.marker.map((marker, id) => {
						return (
							<Marker
								key={id}
								// onClick={onClick}
								position={marker}
							/>
						);
					})
				) : (
					<Marker position={props.center} />
				)}
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(MapsDetail);
