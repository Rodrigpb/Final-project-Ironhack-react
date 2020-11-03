import React from 'react';

import { Progress } from 'antd';

export default function Ratingbar({ percent, label }) {
	return (
		<div className="rating d-flex align-items-center mb-2">
			<div className="row w-100">
				<div className="col-4">
					<label className="mr-3 mb-0" htmlFor={label}>
						{' '}
						{label[0].toUpperCase() + label.slice(1)}{' '}
					</label>
				</div>
				<div className="col-8">
					<Progress strokeColor='#132651' format={(percent) => `${percent}`} percent={percent * 2} size="small" />
				</div>
			</div>
		</div>
	);
}
