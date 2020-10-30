import React from 'react';
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px'
};

function MyMap(props) {
	const [ map, setMap ] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
        <div>
			<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={props.center}
					zoom={10}
					//onLoad={onLoad}
					onUnmount={onUnmount}
				>
                 <Marker
                    position={props.center}
                />
					{/* Child components, such as markers, info windows, etc. */}
				</GoogleMap>
               
			</LoadScript>
           
                </div>
		
	);
}

export default React.memo(MyMap);
