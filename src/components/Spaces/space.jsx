import { DeleteTwoTone, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Avatar, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { deleteSpace } from '../../services/api.service';

export default function Spaces({ setUserProfile, userProfile }) {
	const { space } = userProfile;
    const [ spaces, setSpaces ] = useState('');
	const [ error, setError ] = useState(null);
	const { user } = useAuthContext();


    useEffect(() => {
		setSpaces(space)
	}, []);


	const IconText = ({ icon, text, onClick, style }) => (
		
		<Space onClick={onClick} style={style}>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	const onClick = (id) => {
		const deleteSp = async () => {
			try {
				await deleteSpace(id);
				setSpaces([...spaces.filter((space) => space.id !== id)])
				setUserProfile({...userProfile, space : [...userProfile.spaces.filter((space) => space.id !== id)]});
			} catch (e) {
				setError('No se ha podido borrar el espacio. Vuelve a intentarlo mas tarde.');
			}
		};
		deleteSp();
	};

	return (
		<div>
			{error !== null && (
				<div className="mb-3">
					{' '}
					<Alert message={error} type="error" showIcon closable />{' '}
				</div>
			)}
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page);
					},
					pageSize: 4
				}}
				dataSource={spaces}
				footer={
					<div>
						<b>You work!</b>
					</div>
				}
				renderItem={(item, i) => (
					<List.Item
						key={i}
						actions={[
							<IconText icon={StarOutlined} text={item.comments.length} key="list-vertical-star-o" />,
							<IconText icon={MessageOutlined} text={item.reviews.length} key="list-vertical-message" />,
							
							<IconText
								style={user.id === userProfile.id ? { cursor: 'pointer' } : { display: 'none' } }
								onClick={() => onClick(item.id)}
								icon={DeleteTwoTone}
								key="list-vertical-like-o"
							/>
						
						]}
						extra={<img width={272} alt={item.name} src={item.image[0]} />}
					>
						<List.Item.Meta
							avatar={<Avatar src={userProfile.avatar} />}
							title={<a href={`/space/${item.id}`}>{item.title}</a>}
							description={item.description}
						/>
						{item.content}
					</List.Item>
				)}
			/>,
		</div>
	);
}
