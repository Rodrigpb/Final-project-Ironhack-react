import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import './Button/Button.css';


export default function NewComment(props) {
    
   
	const { TextArea } = Input;


	return (
		<div>
			<Form.Item>
				<TextArea style={{resize: 'none'}} name="comment" rows={4} onChange={props.onChange} value={props.comment} />
			</Form.Item>
            {props.error !== null && <Alert style={{margin:'5px 0'}} message={props.error} type="error" showIcon closable />}
			<Form.Item>
				<Button
					htmlType="submit"
					loading={props.submitting}
					onClick={props.onSubmit}
					style={{ padding: '10px 20px', border: '0', height: '100%', borderRadius:'5px' }}
					className="button"
				>
					Añadir Comentario
				</Button>
			</Form.Item>
            
		</div>
	);
}
