import { Avatar, List } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Launcher } from 'react-chat-window';
import { useAuthContext } from '../../contexts/AuthContext';
import { getChatBetweenTwo, sendMessage } from '../../services/api.service';

export default function Message({ userProfile }) {

	const { user } = useAuthContext()
	const chats = userProfile.chat
	const [change, setChange] = useState(false)
	const [userIdChat, setUserIdChat] = useState(null)
	const [messageList, setMessageList] = useState(null)
	const [openChat, setOpenChat] = useState(false)
	const [chatId, setChatId] = useState(null)
	const [error, setError] = useState(null)
	const intervalId = useRef();

	console.log(userProfile)

	useEffect(() => {
		window.clearTimeout(intervalId.current);
		const getMessage = async () => {
			try {
				const chat = await getChatBetweenTwo(userIdChat);
				const messages = chat[0].message[0].messages.map(message => {
					return {
						author: message.user === user.id ? 'me' : 'them',
						type: 'text',
						data: { text : message.message }
					}
				})
				setChatId(chat)
				setMessageList(messages)
			} catch (e) {
				setError('No se ha podido cargar los mensajes.')
			}
		};

		intervalId.current = setInterval(() => {
			getMessage();
		}, 1500);
	}, [change])

	const _onMessageWasSent = (message) => {
		
		if (message.data.text.length > 0) {
			const newMessage = async () => {
				try {
					await sendMessage(chatId[0].id, message.data.text)
					
				} catch (e) {
					setError('No se ha podido enviar el mensaje.')
				}
			};

			
			newMessage();
			console.log(message.data.text)
			setMessageList([...messageList, {
				author: 'me',
				type: 'text',
				data: { text : message.data.text }
			}]);
			setChange(!change)
			
		}
	};

	const onclick = (id) => {
		setUserIdChat(id)
		setChange(!change)
		setOpenChat(true)
	}

	const handleClick = () => {
		openChat ? setOpenChat(false) : setOpenChat(true)
	}
	
	return (
		<div>
			<List
				itemLayout="horizontal"
				dataSource={chats}
				renderItem={(item) => (
					<List.Item onClick={() => onclick(item.owner.id !== user.id ? item.owner.id : item.user.id)}>
						<List.Item.Meta
							avatar={<Avatar src={item.owner.id !== user.id ? item.owner.avatar : item.user.avatar} />}
							title={item.owner.id !== user.id ? item.owner.name : item.user.name}
							description={item.owner.id !== user.id ? item.owner.email : item.user.email}
						/>
					</List.Item>
				)}
			/>,
			<Launcher
				handleClick ={handleClick}
				style={{ zIndex: '100' }}
				isOpen={openChat}
				agentProfile={{
					teamName: userProfile.name,
					imageUrl: userProfile.avatar
				}}
				onMessageWasSent={_onMessageWasSent}
				messageList={messageList === null ? '' : messageList}
				showEmoji
			/>
		</div>
	);
}
