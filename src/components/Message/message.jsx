import { Avatar, List } from 'antd';
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Message({ userProfile }) {
	const { user } = useAuthContext()
	const chats = userProfile.chat
	console.log(chats)

	const onclick = (e) => {
		console.log(user.id, e)
	}
	
	return (
		<div>
			<List
				itemLayout="horizontal"
				dataSource={chats}
				renderItem={(item) => (
					<List.Item onClick={() => onclick(item.owner.id)}>
						<List.Item.Meta
							avatar={<Avatar src={item.owner.id !== user.id ? item.owner.avatar : item.user.avatar} />}
							title={item.owner.id !== user.id ? item.owner.name : item.user.name}
							description={item.owner.id !== user.id ? item.owner.email : item.user.email}
						/>
					</List.Item>
				)}
			/>,
		</div>
	);
}
