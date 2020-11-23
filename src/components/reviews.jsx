import { Modal, Button, Alert } from 'antd';
import React from 'react';
import { newReview } from '../services/api.service';
import './Button/Button.css';
import Rates from './rate';

class Reviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            generalExperience : 0, 
            clean: 0,
            veracity : 0,
            location : 0,
            arrival : 0,
            services : 0,
            communication : 0,
            visible: false,
            confirmLoading: false,
            error : null,
            visibleok : false
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
        
		
        const sendReview = async () => { 
			try {
                await newReview(this.props.spaceId, review);
				this.setState({visibleok : true}) 
				this.props.setChange()          
			} catch (e) {
				this.setState({error: "Necesitas reservar para poder realizar la evaluación"})
			}
		};

		sendReview();
        
		setTimeout(() => {
			this.setState({
                generalExperience : 0, 
                clean: 0,
                veracity : 0,
                location : 0,
                arrival : 0,
                services : 0,
                communication : 0,
				visible: false,
				confirmLoading: false
			});
        }, 2000);
        
        setTimeout(() => {
            this.setState({
                visibleok : false
            })
        }, 5000)
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	onChange = (e) => {
        const {name, value} = e
		this.setState({
		    [name] : value
		})
	};

	render() {
        const { visible, confirmLoading } = this.state;
		return (
			<span>
				<Button
					className="button"
					style={{ marginBottom: '0', padding: '10px 20px', border: '0', height: '100%', borderRadius: '5px' }}
					onClick={this.showModal}
				>
					Introducir Evaluación
				</Button>
                {this.state.visibleok && <Alert style={{margin:'0 10px', display:'inline'}} message="Gracias por tu evaluación" type="success" showIcon closable /> }
                {this.state.error !== null && <Alert style={{margin:'0 10px', display:'inline'}} message={this.state.error} type="error" showIcon closable />}
				<Modal
					title="Evalúa el paso por este espacio"
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
				>
					<Rates label="General" value={this.state.generalExperience} name="generalExperience" onChange={this.onChange} />
					<Rates label="Limpieza" value={this.state.clean} name='clean' onChange={this.onChange} />
					<Rates label="Veracidad" value={this.state.veracity} name="veracity" onChange={this.onChange} />
					<Rates label="Comunicacion" value={this.state.communication} name='communication' onChange={this.onChange} />
					<Rates label="Localizacion" value={this.state.location} name='location' onChange={this.onChange} />
					<Rates label="Llegada" value={this.state.arrival} name='arrival' onChange={this.onChange} />
					<Rates label="Servicios" value={this.state.services} name='services' onChange={this.onChange} />
				</Modal>
			</span>
		);
	}
}

export default Reviews;
