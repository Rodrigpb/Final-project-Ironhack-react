import Autocomplete from 'react-google-autocomplete';
import React from 'react';

class Map extends React.Component {
	/**
  * When the user types an address in the search box
  * @param place
  */
	onPlaceSelected = (place) => {
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
		});
	};

	render() {
		return (
			<div>
				<label>Dirección</label>
				<Autocomplete
					apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
					style={{
						width: '100%',
						height: '40px',
						paddingLeft: '16px',
						marginTop: '2px',
						marginBottom: '15px'
					}}
					placeholder="Introduce la dirección"
					// onPlaceSelected={this.onPlaceSelected}
					onPlaceSelected={(place) => {
						console.log(place);
					}}
					types={[ 'address' ]}
					componentRestrictions={{ country: 'es' }}
				/>
			</div>
		);
	}
}

export default Map;
