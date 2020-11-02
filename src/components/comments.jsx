import React from 'react';
import { Comment, List } from 'antd';
import { useAuthContext } from '../contexts/AuthContext';
import { red } from '@material-ui/core/colors';

export default function Comments({data, handleDelete}) {
	const { user } = useAuthContext();

	const date = (date) => {
		const newDate = new Date(date)
		return newDate.toLocaleString()
	}
	
	return (
		<List
			className="comment-list"
			header={`${data.length} commentarios`}
			itemLayout="horizontal"
			dataSource={data}
			renderItem={(item) => (
				<li>
					<Comment
						actions={user === item.user?.id && [<span onClick={() => handleDelete(item.id)} style={{color: 'red'}} key="comment-nested-reply-to">Borrar</span>]}
						author={item.user?.name}
						avatar={item.user?.avatar}
						content={item.text}
						datetime={date(item.updatedAt)}
						
					/>
				</li>
			)}
		/>
	);
}
