import React from 'react';
import './Button.css'

export default function Button({ type, name, onclick, className }) {
	return (
		<div className="text-center">
			<button className={className} type={type} name={name} onClick={onclick}>{name}</button>
		</div>
	);
}

Button.defaultProps = {
	className : 'button'
}