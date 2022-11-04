import React, { useState, useEffect } from 'react'
import SecondNavbar from '../../components/navbar/SecondNavbar'
import SquareButton from '../../components/buttons/SquareButton'

import {
    AddClusterIcon, 
    DeleteClusterIcon, 
    AddWellIcon,
    DeleteWellIcon 
} from '../../svg/icons'

import { scrollHeight } from '../../scripts'

const navData: string[] = ["Меню"]

function Wells() {
    const [height, setHeight] = useState<number>(0)
    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        setHeight(scrollHeight())
    }, []);
    return (
        <>
        <SecondNavbar data={navData} page={page} setPage={setPage}/>
        <div className="button-block">
            <div className="buttons">
                <div className='stat-block'>
                <div className="circle-stat-card">
                    Круговая статистика
                </div>
                <div className="bar-stat-card">
                    В бурении
                </div>
                <div className="bar-stat-card">
                    В ожидании
                </div>
                </div>
                <SquareButton text={"Удалить куст"}>
                    <AddClusterIcon/>
                </SquareButton>
                <SquareButton text={"Удалить куст"}>
                    <DeleteClusterIcon/>
                </SquareButton>
                <SquareButton text="Добавить скважину">
                    <AddWellIcon/>
                </SquareButton>
                <SquareButton text="Удалить скважину">
                    <DeleteWellIcon/>
                </SquareButton>
            </div>
        </div>
        {/* <div className="main-block">
            <div className='main-data'>
                <div className='main-well-block'>

                </div>
            </div>
        </div> */}
        <div className="main-block" style={{height: `calc(${height}px - 350px)`}}>
            <div className='main-data'>
                <div className='main-data-card'>
                    <div className='wells-block'>
                        <div className='wells-text-block' style={{lineHeight: '45px', textAlign: "left"}}>
                        <b>Название</b>
                        </div>
                        <div className='wells-info-block'>
                            В бурении - 9
                            <div className='one-well-info'>
                                <div className='one-big-initial-box'>С</div>
                                <div className='one-well-text-info'>
                                Севкомнефтегаз<br/>
                                Куст 1, Скважина 143
                                </div>
                            </div>
                            <div className='one-well-info'></div>
                            <div className='one-well-info'></div>
                            <div className='one-well-info'></div>
                            <div className='one-well-info'></div>
                            <div className='one-well-info'></div>
                            Смотреть все
                        </div>
                    </div>
                    <div className='wells-block'>
                        <div className='wells-text-block'>
                        Всего скважин<br/>
                        <span style={{fontWeight: 500}}>кол-во</span>
                        </div>
                        <div className='wells-info-block'></div>
                    </div>
                    <div className='wells-block'>
                        <div className='wells-text-block'>
                        Последняя активность<br/>
                        <span style={{fontWeight: 500}}>дата</span>
                        </div>
                        <div className='wells-info-block'></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Wells;