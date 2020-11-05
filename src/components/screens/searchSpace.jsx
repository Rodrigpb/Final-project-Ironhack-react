import React, { useEffect, useState } from 'react';
import { searchSpace } from '../../services/api.service';
import CardSpace from '../cardSpace/cardSpace';
import '../stylesheet/searchSpace.css';
import MyMap from '../googleMaps';

const SearchSpace = ({ match }) => {
	const [ space, setSpace ] = useState(null);
	const [ markerSpace, setMarkerSpace ] = useState([]);
	const query = match.params.search;

	useEffect(() => {
		console.log(query);
		const getSearch = async () => {
			const spaces = await searchSpace(query);
			setSpace(spaces);
			setMarkerSpace(
				spaces.map((space) => {
					return {
						lat: space.location.coordinates[0],
						lng: space.location.coordinates[1]
					};
				})
			);
		};

		getSearch();
	}, []);

	return (
		<div className="SearchSpace">
			<h1 className="text-center font-italic title">{`Espacios en ${query}`}</h1>
			<div className="container container-space">
				{space === null ? (
					<div class="alert alert-warning mt-5 text-center" role="alert">
						Cargando...
					</div>
				) : space.length === 0 ? (
					<div className="container">
						<h3 class="font-italic mt-5 text-center" role="alert">
							Upps.. No hay resultados de tu busqueda. Intente en otra ciudad
						</h3>
					</div>
				) : (
					<div className="container">
						<div className="row cards-spaces">
							{space.map((space, i) => <CardSpace key={i} space={space} />)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchSpace;
