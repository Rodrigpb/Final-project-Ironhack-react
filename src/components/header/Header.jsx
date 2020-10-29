import './Header.css';
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Header.css';
import { SearchOutlined } from '@ant-design/icons';

const Header = (props) => {
	const { user } = useAuthContext();
	const [ search, setSearch ] = useState('');

	const onChange = (e) => {
		console.log(e.target.value);
		setSearch(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(props);
		///history.push(`/search?search=${search}`)
	};

	return (
		<header className='Header'>
			<div className="container header-container">
				<img src="/images/logo.png" alt="logo" className="logo" />
				<form className="search" onSubmit={onSubmit}>
					<input name="search" placeholder="¿Donde quieres trabajar?" value={search} onChange={onChange} />
					<button type="submit" style={{ border: '0', backgroundColor: 'white' }}>
						<SearchOutlined className="search-logo" />
					</button>
				</form>
				<div className="nav">
					<Link to="/new" className="mr-4 color-logo">
						AÑADE TU ESPACIO
					</Link>
					{user ? (
						user.name
					) : (
						<Link className="color-logo" to="/login">
							ENTRAR
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
