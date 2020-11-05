import { HomeOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons';
import { CircularProgress } from '@material-ui/core';
import { Avatar, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/api.service';
import Chat from '../Chat/chat';
import PersonalDate from '../personalDate/personalDate';
import Spaces from '../Spaces/space';

import '../stylesheet/profile.css';

const Profile = ({ match }) => {
	const [ userProfile, setUserProfile ] = useState(null);
	const idProfile = match.params.id;
	const { Item } = Menu;
	const [ step, setStep ] = useState('datos');

	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const user = await getUser(idProfile);
				setUserProfile(user);
			} catch (e) {
				console.log(e);
			}
		};
		getUserProfile();
	}, []);

	const handleClick = (e) => {
		setStep(e.key);
  };

	return (
		<div className="profile" style={{ marginTop: '80px' }}>
			{userProfile === null ? (
				<div className="text-center" style={{ marginTop: '120px' }}>
					<CircularProgress />
				</div>
			) : (
				<div className="container">
					<div className="row menu-profile">
						<div className="col-md-4 ">
							<Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
								<Item
									key="datos"
									style={{ display: 'flex', alignItems: 'center' }}
									icon={<ProfileOutlined />}
								>
									Datos personales
								</Item>
								<Item
									key="mensajes"
									style={{ display: 'flex', alignItems: 'center' }}
									icon={<MailOutlined />}
								>
									Mensajes
								</Item>
								<Item
									key="espacios"
									style={{ display: 'flex', alignItems: 'center' }}
									icon={<HomeOutlined />}
								>
									Espacios
								</Item>
							</Menu>
						</div>
						<div className="col-md-8">
							{step === 'datos' && (
								<div className="container">
									<PersonalDate userProfile={userProfile} />
                </div>
							)}
              {step === 'mensajes' && (
								<div className="container">
									<Chat userProfile={userProfile} />
                </div>
							)}
              {step === 'espacios' && (
								<div className="container">
									<Spaces userProfile={userProfile} />
                </div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
