import React, {useState, useEffect} from 'react'
import SecondNavbar from '../../components/navbar/SecondNavbar'
import SquareButton from '../../components/buttons/SquareButton'
import VerticalPieChart from '../../components/charts/VerticalPieChart'
import MiniBarChart from '../../components/charts/MiniBarChart'
import BigInfoCard from '../../components/cards/BigInfoCard'

import ContractorModal from '../../components/modals/ContractorModal'
import DeleteModal from '../../components/modals/DeleteModal'

import { scrollHeight } from '../../scripts'
import { AuthInterceptor } from '../../interceptors/AuthInterceptor'
import { IData, IBarData, IWellData } from '../../types/types'
import { PlusIcon, MinusIcon } from '../../svg/icons'
import { get_contractors_all, get_contractors_stat_all, get_contractors_stat_total } from '../../api/ContractorAPI'

function Services() {
    const [wellsData, setWellsData] = useState<IWellData[]>([])
    const [contractStatData, setContractStatData] = useState<IData[]>([])
    const [contractMonthStatData, setContractMonthStatData] = useState<IBarData[]>([])
    const [height, setHeight] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [modalContractorShow, setModalContractorShow] = useState<boolean>(false)
    const [modalDeleteContractorShow, setModalDeleteContractorShow] = useState<boolean>(false)

    useEffect(() => {
        AuthInterceptor();
        setHeight(scrollHeight());
        get_contractors_all(setWellsData);
        get_contractors_stat_all(setContractStatData);
        get_contractors_stat_total(setContractMonthStatData);
    }, []);

    return (
        <>
        <DeleteModal 
            show={modalDeleteContractorShow} 
            onHide={() => setModalDeleteContractorShow(false)} 
            data={wellsData.map((item) => item.name)}
            label="Название"
            placeholder="Выберите подрядчика"
            type="contractor"
        />
        <ContractorModal 
            show={modalContractorShow} 
            onHide={() => setModalContractorShow(false)}
        />
        <SecondNavbar data={wellsData.map((item) => item.name)} page={page} setPage={setPage}/>
        <div className="button-block">
            <div className="buttons">
                <div className='stat-block'>
                    { contractStatData.length > 0 && <VerticalPieChart data={contractStatData}/> }
                    { contractMonthStatData.length > 0 && 
                        <MiniBarChart
                            data={contractMonthStatData[page]}
                            page={page}
                            setPage={setPage}
                            length={wellsData.length}
                        /> 
                    }
                </div>
                <SquareButton text="Добавить подрядчика" onClick={() => setModalContractorShow(true)}>
                    <PlusIcon/>
                </SquareButton>
                <SquareButton text="Удалить подрядчика" onClick={() => setModalDeleteContractorShow(true)}>
                    <MinusIcon/>
                </SquareButton>
            </div>
        </div>
        <div className="main-block" style={{height: `calc(${height}px - 350px)`}}>
            <div className='main-data'>
                { wellsData.length > 0 && 
                <BigInfoCard 
                    data={wellsData[page]}
                    page={page}
                    setPage={setPage}
                    length={wellsData.length}
                /> 
                }
            </div>
        </div>
        </>
    )
}

export default Services;
