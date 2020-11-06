import './Header.css';
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import { SearchOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { logout as LogOutUser } from '../../services/api.service.js';

const Header = (props) => {
	const { user, logout } = useAuthContext();
	const history = useHistory();
	const [ search, setSearch ] = useState('');
	const [ anchorEl, setAnchorEl ] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onChange = (e) => {
		setSearch(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		history.push(`/search/${search}`);
	};

	const handleClickLogOut = () => {
		const log = async () => {
			await LogOutUser();
			logout();
		};
		log();
	};

	return (
		<header className="Header">
			<div className="container header-container">
				<Link to="/">
					<img src="/images/logo.png" alt="logo" className="logo" />
				</Link>
				<form className="search" onSubmit={onSubmit}>
					<input name="search" placeholder="¿Donde quieres trabajar?" value={search} onChange={onChange} />
					<button type="submit" style={{ border: '0', backgroundColor: 'white' }}>
						<SearchOutlined className="search-logo" />
					</button>
				</form>
				<div className="nav">
					<Link to="/new-space" className="mr-4 color-logo">
						AÑADE TU ESPACIO
					</Link>
					{user ? (
						<div>
							<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
								<Avatar src={user.avatar} />
								<span className="ml-1">{user.name}</span>
							</Button>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem>
									<Link className="color-logo" to={`/profile/${user.id}`}>
										Ver perfil
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClickLogOut}>Cerrar sesión</MenuItem>
							</Menu>
						</div>
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
