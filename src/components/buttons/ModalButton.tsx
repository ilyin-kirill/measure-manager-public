import React from 'react'
import './stylesButtons.scss'

interface IButtonProps {
    type?: 'submit' | 'reset' | 'button';
    text: string;
    onClick: () => void;
}

const ModalButton: React.FC<IButtonProps> = ({ type, onClick, text }) => {
    return (
        <button className="modal-button" type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default ModalButton