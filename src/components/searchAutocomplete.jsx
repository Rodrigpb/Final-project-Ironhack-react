import Autocomplete from 'react-google-autocomplete';
import React from 'react';

class MapBar extends React.Component {


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
					onPlaceSelected={this.props.onPlaceSelected}
					types={[ 'address' ]}
					componentRestrictions={{ country: 'es' }}
				/>
			</div>
		);
	}
}

export default MapBar;
