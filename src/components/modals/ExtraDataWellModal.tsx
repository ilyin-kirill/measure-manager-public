import React from 'react';
import { Modal } from 'react-bootstrap'
import ExtraWellDataTable from '../tables/ExtraWellDataTable';
import { IWellData } from '../../types/types'

interface IExtraWellProps {
    show: boolean;
    onHide: () => void;
    wellData: IWellData;
    type: string;
}

const ExtraDataWellModal: React.FC<IExtraWellProps> = ({show, onHide, wellData, type}) => {
    return ( 
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-container'>
                <Modal.Header 
                    closeButton 
                    style={{border: "none", padding: "2rem 3rem 0 3rem"}}
                >
                </Modal.Header>
                <Modal.Body style={{padding: "0 3rem 0 3rem"}}>
                    <div style={{width: "100%"}}>
                        <span style={{fontSize: '16px'}}>
                            {type !== 'in_drilling' ? type === 'pending' ? 'В ожидании' : 'Добурены' : 'В бурении'} - <b>{wellData.name}</b>
                        </span>
                    </div>
                    <ExtraWellDataTable
                        data={type !== 'in_drilling' ? type === 'pending' ? wellData.pending : wellData.drilled : wellData.in_drilling}
                        type={type}
                    />
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default ExtraDataWellModal;