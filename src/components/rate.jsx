import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

const customIcons = {
	1: <FrownOutlined />,
	2: <FrownOutlined />,
	3: <MehOutlined />,
	4: <SmileOutlined />,
	5: <SmileOutlined />
};

export default function Rates({label, onChange, name, value}) {
	return (
		<div className="rating d-flex align-items-center mb-2">
				<div className="col-3">
					<label className="mr-3 mb-0" htmlFor={label}>
						{' '}
						{label[0].toUpperCase() + label.slice(1)}{' '}
					</label>
				</div>
				<div className="col-9">
					<Rate
						value={value}
                        name={name}
						defaultValue={0}
						character={({ index }) => {
							return customIcons[index + 1];
						}}
						onChange={(value) => onChange({name, value})}
					/>
				</div>
			
		</div>
	);
}
