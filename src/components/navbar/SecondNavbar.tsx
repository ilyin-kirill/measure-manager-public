import React from 'react'
import '../../../src/styles.scss'

const focusNavItem: object = {
    color: "black",
    borderBottom: "3px solid #FED602"
}

interface ISNavbarProps {
    data: string[];
    page: number;
    setPage: (index: number) => void;
}

const SecondNavbar: React.FC<ISNavbarProps> = (props) => {
    return (
        <div className="nav-block">
            <div className="nav-items">
                {props.data.map((item: string, index: number) => 
                    <div className="nav-item" style={props.page === (index)  ? focusNavItem : {}} onClick={() => props.setPage(index)}>
                        {item}
                    </div> 
                )}
            </div>
        </div>
    )
}

export default SecondNavbar;