import React, { useState } from 'react';
import './styles.scss'
import ExtraDataWellModal from '../modals/ExtraDataWellModal';

import { generateColor, getLogo } from '../../scripts';
import { ArrowRightIcon, ArrowLeftIcon } from '../../svg/icons';
import { ICardProps, IWellData } from '../../types/types';

const BigInfoCard: React.FC<ICardProps<IWellData>> = ({ data, page, setPage, length }) => {
    const [modalExtraDataWell, setModalExtraDataWell] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>('')

    const openModal = (type: string): void => {
        setModalExtraDataWell(true)
        setModalType(type)
    }

    return ( 
        <>
        <ExtraDataWellModal 
            show={modalExtraDataWell}
            onHide={() => setModalExtraDataWell(false)}
            wellData={data}
            type={modalType}
        />
        <div className='main-data-card' style={{backgroundColor: data.color}}>
            {/* каждый блок можно вынести в отдельный компонент */}
            <div className='arrow-button-container' style={{left: '-17px'}}>
                <button className='arrow-button' onClick={() => page - 1 < 0 ? setPage(length - 1) : setPage(page - 1)}>
                    <ArrowLeftIcon/>
                </button>
            </div>
            <div className='wells-block' style={{paddingLeft: '30px'}}>
            <div className='wells-text-block' style={{textAlign: "left"}}>
            {getLogo(data.name)}<b>{ data.name.length > 15 ? data.name.split(" ").map((word) => word.slice(0, 1)).join('').toUpperCase() : data.name}</b>
            </div>
            <div className='wells-info-block'>
                В бурении &ndash;&nbsp;<b>{data.in_drilling.length}</b>
                {
                data.in_drilling.length > 0 ? 
                    data.in_drilling.map((item, index) => 
                        index < 5 && 
                        <div className='one-well-info' key={`${item.subsidiary}-${item.bush}-${item.well}`}>
                            <div className='one-big-initial-box' style={{backgroundColor: generateColor()}}>{item.subsidiary.slice(0, 1)}</div>
                            <div className='one-well-text-info'>
                                {item.subsidiary}<br/>
                                {`${item.bush}, ${item.well}`}
                            </div>
                        </div>
                    ) : <div className='one-well-info'>Записей не найдено</div>
                }
                <span style={{visibility : (data.in_drilling.length > 0 ? 'visible' : 'hidden')}} className='extra-well-data-click' onClick={() => openModal('in_drilling')}>
                    Смотреть всe
                </span>
            </div>
            </div>
            <div className='wells-block'>
                <div className='wells-text-block'>
                Всего скважин<br/>
                <span style={{fontWeight: 500}}>
                    {data.in_drilling.length + data.pending.length + data.drilled.length}
                </span>
                </div>
                <div className='wells-info-block'>
                    В ожидании &ndash;&nbsp;<b>{data.pending.length}</b>
                    {
                    data.pending.length > 0 ? 
                        data.pending.map((item, index) => 
                            index < 5 && 
                            <div className='one-well-info' key={`${item.subsidiary}-${item.bush}-${item.well}`}>
                                <div className='one-big-initial-box' style={{backgroundColor: generateColor()}}>{item.subsidiary.slice(0, 1)}</div>
                                <div className='one-well-text-info'>
                                    {item.subsidiary}<br/>
                                    {`${item.bush}, ${item.well}`}
                                </div>
                            </div>
                        ) : <div className='one-well-info'>Записей не найдено</div>
                    }
                    <span style={{visibility : (data.in_drilling.length > 0 ? 'visible' : 'hidden')}} className='extra-well-data-click' onClick={() => openModal('pending')}>
                        Смотреть всe
                    </span>
                </div>
            </div>
            <div className='wells-block' style={{paddingRight: '30px'}}>
                <div className='wells-text-block'>
                Последняя активность<br/>
                <span style={{fontWeight: 500}}>{data.latest_activity}</span>
                </div>
                <div className='wells-info-block'>
                    Добурены &ndash;&nbsp;<b>{data.drilled.length}</b>
                    {
                    data.drilled.length > 0 ? 
                        data.drilled.map((item, index) => 
                            index < 5 && 
                            <div className='one-well-info' key={`${item.subsidiary}-${item.bush}-${item.well}`}>
                                <div className='one-big-initial-box' style={{backgroundColor: generateColor()}}>{item.subsidiary.slice(0, 1)}</div>
                                <div className='one-well-text-info'>
                                    {item.subsidiary}<br/>
                                    {`${item.bush}, ${item.well}`}
                                </div>
                            </div>
                        ) : <div className='one-well-info'>Записей не найдено</div>
                    }
                    <span style={{visibility : (data.in_drilling.length > 0 ? 'visible' : 'hidden')}} className='extra-well-data-click' onClick={() => openModal('drilled')}>
                        Смотреть все
                    </span>
                </div>
            </div>
            <div className='arrow-button-container' style={{right: '-17px'}}>
                <button className='arrow-button' onClick={() => page + 1 > length - 1 ? setPage(0) : setPage(page + 1)}>
                    <ArrowRightIcon/>
                </button>
            </div>
        </div>
        </>
    );
}

export default BigInfoCard;