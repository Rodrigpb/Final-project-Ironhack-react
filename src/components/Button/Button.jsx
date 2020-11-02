import React from 'react';
import './Button.css'

export default function Button(props) {
	return (
		<div className="text-center">
			<button {...props}>{props.name}</button>
		</div>
	);
}

Button.defaultProps = {
	className : 'button'
}