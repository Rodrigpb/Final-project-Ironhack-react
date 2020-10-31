import React from 'react';

import { Input } from '@material-ui/core';

export default function InputNumberWithLabel({ value, label, onChange, type, name }) {
	return (
		<div className="InputWithLabel">
			<label htmlFor={label}> {label[0].toUpperCase() + label.slice(1)} </label>
			<br />
			<Input
				className="pl-2"
				name={name}
				id={label}
				inputProps={{ min: 0 }}
				value={value}
				type={type}
				onChange={onChange}
			/>
		</div>
	);
}
