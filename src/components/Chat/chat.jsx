import React, { useEffect, useRef, useState } from 'react';
import { Launcher } from 'react-chat-window';
import { useAuthContext } from '../../contexts/AuthContext';
import { createChat, sendMessage, getChatBetweenTwo } from '../../services/api.service';
import './chat.css';

const Chat = ({ nameUser, avatar, userSpace }) => {
	const [ messageList, setMessageList ] = useState([]);
	const [ chatId, setChatId ] = useState(null);
	const [ error, setError ] = useState(null);
	const { user } = useAuthContext();
	const [ change, setChange ] = useState(false);
	const intervalId = useRef();

	useEffect(() => {
		const chat = async () => {
			try {
				const chat = await getChatBetweenTwo(userSpace.id);

				if (chat === null) {
					const chatDate = await createChat(userSpace.id);
					setChatId(chatDate);
				} else {
					setChatId(chat);
				}
			} catch (e) {
				setError('Error en el chat. Recarga la pagina y vuelva a intentarlo');
			}
		};
		chat();
	}, []);

	useEffect(
		() => {
			window.clearTimeout(intervalId.current);
			const getMessage = async () => {		
				try {
					const chat = await getChatBetweenTwo(userSpace.id);
					const messages = chat[0].message[0].messages.map((message) => {
						return {
							author: message.user === user.id ? 'me' : 'them',
							type: 'text',
							data: { text: message.message }
						};
					});
					setMessageList([...messages]);
				} catch (e) {
					setError('No se ha podido cargar los mensajes.');
				}
			};

			intervalId.current = setInterval(() => {
				getMessage();
			}, 1500);
		},
		[ change ]
	);

	const _onMessageWasSent = (message) => {
		if (message.data.text.length > 0) {
			const newMessage = async () => {
				try {
					await sendMessage(chatId[0].id, message.data.text);
				} catch (e) {
					setError('No se ha podido enviar el mensaje.');
				}
			};

			newMessage();
			// setMessageList([
			// 	...messageList,
			// 	{
			// 		author: 'me',
			// 		type: 'text',
			// 		data: { text: message.data.text }
			// 	}
			// ]);
			setChange(!change);
		}
	};

	return (
		<div>
			<Launcher
				style={{ zIndex: '100' }}
				agentProfile={{
					teamName: nameUser,
					imageUrl: avatar
				}}
				onMessageWasSent={_onMessageWasSent}
				messageList={messageList}
				showEmoji
			/>
		</div>
	);
};

export default Chat;
