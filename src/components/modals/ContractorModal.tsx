import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import InputCustom from '../input/InputCustom';
import ModalButton from '../buttons/ModalButton';

import { add_contractor } from '../../api/ContractorAPI';
import { toaster } from 'evergreen-ui';

interface IContractorProps {
    show: boolean;
    onHide: () => void;
}

const ContractorModal: React.FC<IContractorProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    type InputEvent = React.ChangeEvent<HTMLInputElement>;

    const onSubmit = () : void => {
        if (name && phone && email) {
            add_contractor(name, email, phone)
        } else toaster.notify("Все поля должны быть заполнены!") 
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <div className='modal-container'>
        <Modal.Header closeButton style={{border: "none", padding: "2rem 3rem 0 3rem"}}>
        </Modal.Header>
        <Modal.Body style={{padding: "0 3rem 0 3rem"}}>
            <div style={{width: "100%"}}>
            <InputCustom
                type="text"
                blue={true}
                placeholder="Введите название подрядчика"
                label="Название"
                value={name}
                onChange={(e: InputEvent) => setName(e.target.value)}
            />
            <InputCustom
                type="email"
                blue={true}
                placeholder="Введите email подрядчика"
                label="Email"
                value={email}
                onChange={(e: InputEvent) => setEmail(e.target.value)}
            />
            <InputCustom
                type="text"
                blue={true}
                placeholder="Введите телефон подрядчика"
                label="Телефон"
                value={phone}
                onChange={(e: InputEvent) => setPhone(e.target.value)}
            />
            </div>
        </Modal.Body>
        <Modal.Footer style={{border: "none", padding: "0 3rem 2rem 3rem"}}>
            <ModalButton onClick={() : void => onSubmit()} text="Добавить"/>
        </Modal.Footer>
        </div>
        </Modal>
    );
}

export default ContractorModal;