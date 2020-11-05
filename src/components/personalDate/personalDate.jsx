import { UploadOutlined } from '@ant-design/icons';
import { TextField } from '@material-ui/core';
import { List, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { updateUser } from '../../services/api.service';
import Button from '../Button/Button';
import './personalDate.css';

const PersonalDate = ({ userProfile }) => {
	const { user } = useAuthContext();
	const [ state, setState ] = useState({
		name: userProfile.name,
		number: userProfile.number,
		nif: userProfile.nif,
		razonSocial: userProfile.razonSocial,
		direccion: userProfile.direccion,
		image: userProfile.avatar
	});

	const [ visible, setVisible ] = useState(false);

	const data = [
		{ name: 'Nombre', data: state.name, value: 'name' },
		{ name: 'Email', data: userProfile.email, value: 'email' },
		{ name: 'Número', data: state.number, value: 'number' },
		{ name: 'Nif', data: state.nif, value: 'nif' },
		{ name: 'Razón social', data: state.razonSocial, value: 'razonSocial' },
		{ name: 'Dirección', data: state.direccion, value: 'direccion' }
	];

	const handleClick = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const onChange = (e) => {
		const { name, value, files } = e.target;

		setState({
			...state,
			[name]: files ? files[0] : value
		});
	};

	const handleSubmit = () => {
		const update = async () => {
			try {
				const userUpdate = await updateUser(userProfile.id, state);
				setVisible(false)
			} catch (e) {
				console.log(e);
			}
		};
		update();
	};

	return (
		<div className="personal-date">
			<div className="row d-flex align-items-center">
				<div className="col-md-4 ">
					<label htmlFor="file-input">
						<img
							name="image"
							className={visible ? 'pointer-img img-profile' : 'img-profile'}
							src={state.image !== user.avatar ? URL.createObjectURL(state.image) : userProfile.avatar}
							alt={userProfile.name}
							style={{ width: '100%' }}
						/>
					</label>
					{userProfile.id === user.id &&
					visible && (
						<input
							onChange={onChange}
							type="file"
							name="image"
							id="file-input"
							className="file-input"
							placeholder="d"
						/>
					)}
				</div>
				<div className="col-md-8">
					<List
						header={<div className="font-italic font-weight-bold">Datos personales</div>}
						bordered
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<div className="col-md-4">
									<Typography.Text strong>{item.name}</Typography.Text>
								</div>
								<div className="col-md-8">
									{visible && item.value !== 'email' ? (
										<TextField
											id={item.name}
											type={item.value === 'number' ? 'number' : 'text'}
											value={state[item.value]}
											name={item.value}
											onChange={onChange}
										/>
									) : (
										item.data
									)}
								</div>
							</List.Item>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				{userProfile.id === user.id && (
					<Button
						name={visible ? 'Aceptar' : 'Modificar Datos'}
						onClick={visible ? handleSubmit : handleClick}
					/>
				)}
				{userProfile.id === user.id &&
				visible && <Button style={{ marginLeft: '10px' }} name={'Cancelar'} onClick={handleCancel} />}
			</div>
		</div>
	);
};

export default PersonalDate;
