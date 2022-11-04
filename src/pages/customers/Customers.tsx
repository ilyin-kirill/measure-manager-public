import React, { useState } from 'react'
import SecondNavbar from '../../components/navbar/SecondNavbar'
import SquareButton from '../../components/buttons/SquareButton'

import { PlusIcon, MinusIcon } from '../../svg/icons'

const navData: string[] = ["Меню", "Меню2"]

function Customers(): JSX.Element {
    const [page, setPage] = useState<number>(0)
    return (
        <>
        <SecondNavbar data={navData} page={page} setPage={setPage}/>
        <div className="button-block">
            <div className="buttons">
                <SquareButton text="Добавить общество">
                    <PlusIcon/>
                </SquareButton>
                <SquareButton text="Удалить общество">
                    <MinusIcon/>
                </SquareButton>
            </div>
        </div>
        <div className="main-block">
            <h2>Общества</h2>
        </div>
        </>
    )
}

export default Customers;
