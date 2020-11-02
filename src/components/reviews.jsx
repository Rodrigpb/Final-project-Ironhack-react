import { Modal, Button, Rate, Alert } from 'antd';
import React from 'react';
import { newReview } from '../services/api.service';
import './Button/Button.css';
import Rates from './rate';

class Reviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            General : 0,
            Limpieza : 0,
            Veracidad : 0,
            Comunicacion : 0,
            Localizacion : 0,
            Llegada : 0,
            Servicios : 0,
            visible: false,
            confirmLoading: false,
            error : null
        };
    }
	
	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = () => {
		this.setState({
			confirmLoading: true
        });
        const review = {...this.state}
        delete review.visible
        delete review.confirmLoading
        delete review.error
        console.log(this.props.spaceId)

        const sendReview = async () => { 
			try {
				await newReview(this.props.spaceId, review);
			} catch (e) {
				this.setState({error: e})
			}
		};

		sendReview();
        
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			});
		}, 2000);
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	onChange = (e) => {
        const {label, value} = e
		console.log(this.state);
		this.setState({
		    [label] : value
		})
	};

	render() {
		const { visible, confirmLoading } = this.state;
		return (
			<span>
				<Button
					className="button"
					style={{ padding: '10px 20px', border: '0', height: '100%', borderRadius: '5px' }}
					onClick={this.showModal}
				>
					Introducir Evaluación
				</Button>
                {this.state.error !== null && <Alert style={{margin:'5px 0'}} message={this.state.error} type="error" showIcon closable />}
				<Modal
					title="Evalúa el paso por este espacio"
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
				>
					<Rates label="General" onChange={this.onChange} />
					<Rates label="Limpieza" onChange={this.onChange} />
					<Rates label="Veracidad" onChange={this.onChange} />
					<Rates label="Comunicacion" onChange={this.onChange} />
					<Rates label="Localizacion" onChange={this.onChange} />
					<Rates label="Llegada" onChange={this.onChange} />
					<Rates label="Servicios" onChange={this.onChange} />
				</Modal>
			</span>
		);
	}
}

export default Reviews;
