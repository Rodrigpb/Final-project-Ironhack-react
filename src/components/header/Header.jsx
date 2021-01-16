import './Header.css';
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import { SearchOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { logout as LogOutUser } from '../../services/api.service.js';
import { Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = (props) => {
	const { user, logout } = useAuthContext();
	const history = useHistory();
	const [ search, setSearch ] = useState('');
	



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
	
		
			<Navbar expand="lg" className='Header container-fluid'>
				<div className='container'>
				<Navbar.Brand href="/">
					<img src="/images/logo.png" alt="logo" className="logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="header-container justify-content-center">
					<Form inline onSubmit={onSubmit} className="search d-flex ">
						<FormControl
							name="search"
							type="text"
							placeholder="¿Donde quieres trabajar?"
							value={search}
							onChange={onChange}
						/>
						<Button
							type="submit"
							style={{ border: '0', backgroundColor: 'white' }}
							
						>
							<SearchOutlined className="search-logo" />
						</Button>
					</Form>
					<Nav >
						<Nav.Link href="/new-space" className="mr-4 color-logo">
							Añade tu espacio
						</Nav.Link>
						{user ? (
							<NavDropdown title={user.name} id="basic-nav-dropdown">
								<NavDropdown.Item href={`/profile/${user.id}`} className="color-logo">
									Ver perfil
								</NavDropdown.Item>
								<NavDropdown.Item href="#" onClick={handleClickLogOut}>
									Cerrar sesión
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link href="/login" className="color-logo">
								Entrar
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
				</div>
			</Navbar>
			
	
	);
};

export default Header;


