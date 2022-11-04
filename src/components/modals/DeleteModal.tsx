import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import SelectCustom from '../select/SelectCustom';
import ModalButton from '../buttons/ModalButton';
import { delete_user } from '../../api/UserAPI';
import { delete_contractor } from '../../api/ContractorAPI';
import { toaster } from 'evergreen-ui';

interface IDeleteProps {
    show: boolean;
    onHide: () => void;
    type: string;
    label: string;
    data: string[];
    placeholder: string;
}

const DeleteModal: React.FC<IDeleteProps> = ({ show, onHide, type, label, data, placeholder }) => {
    const [text, setText] = useState<string>('')

    const onDelete = (): void => {
        if (!!text) {
            if (type === "user") 
                delete_user(text);
            else if (type === "contractor") 
                delete_contractor(text);
        } else toaster.notify("Выберите запись для удаления!")
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <div className='modal-container'>
        <Modal.Header closeButton style={{border: "none", padding: "2rem 3rem 0 3rem"}}>
        </Modal.Header>
        <Modal.Body style={{padding: "0 3rem 0 3rem"}}>
            <div style={{width: "100%"}}>
            <SelectCustom
                placeholder={placeholder}
                blue={true}
                label={label}
                data={data}
                value={text}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) : void => setText(e.target.value)}
            />
            </div>
        </Modal.Body>
        <Modal.Footer style={{border: "none", padding: "0 3rem 2rem 3rem"}}>
            <ModalButton onClick={() : void => onDelete()} text="Удалить"/>
        </Modal.Footer>
        </div>
        </Modal>
    );
}

export default DeleteModal;