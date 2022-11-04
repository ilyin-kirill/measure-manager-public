import React, { PropsWithChildren } from 'react';
import './stylesButtons.scss'

interface IButtonProps {
    onClick?: () => void;
    text: string;
}

const SquareButton: React.FC<PropsWithChildren<IButtonProps>>  = ({ children, onClick, text }) => {
    return (
        <button className="square-button" onClick={onClick}>
            {children}<br/><br/>
            {text}
        </button>
    )
}

export default React.memo(SquareButton)