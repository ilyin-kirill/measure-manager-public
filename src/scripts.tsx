import React from 'react';
import { BakerHughesIcon } from './svg/iconsServices'
import AiDriller from './svg/aidriller.svg'
import Halliburton from './svg/halliburton.svg'
import PNMR from './svg/pnmr.svg'
import SB from './svg/schlumberger.svg'
import SSK from './svg/ssk.svg'
import Weatherford from './svg/weatherford.svg'

const colors: string[] = [
    '#FED602',
    '#FF8863',
    '#4DC3F7',
    '#8DDA71',
    '#BD65A4',
    '#3682DB',
    '#FF0000',
    '#3B2667',
    '#0000FF',
    '#858585'
];

const darkColors: string[] = [
    "#3B2667",
    "#de7a09",
    "#110787",
    "#e81051",
    "#18b015"
]

let numColor: number = -1;
let numDarkColor: number = -1;

export function generateColor(dark?: boolean): string {
    if (!dark){
        if (numColor === colors.length - 1) numColor = -1
        numColor += 1;
        return colors[numColor];
    } else {
        if (numDarkColor === darkColors.length - 1) numDarkColor = -1
        numDarkColor += 1;
        return darkColors[numDarkColor];
    }
}

export const scrollHeight = (): number => {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
} 

export const getLogo = (name: string): JSX.Element => {
    if (name === 'Baker Hughes') return <BakerHughesIcon/>
    else if (name === 'Halliburton') return <img src={Halliburton} alt='Halliburton' style={{marginRight: '1rem'}}/>
    else if (name === 'Schlumberger') return <img src={SB} alt='SB' style={{marginRight: '1rem'}}/>
    else if (name === 'Интеллектуальные системы') return <img src={AiDriller} alt='AiDriller' style={{marginRight: '1rem'}}/>
    else if (name === 'Weatherford') return <img src={Weatherford} alt='Weatherford' style={{marginRight: '1rem'}}/>
    else if (name === 'ССК' || name === 'Сибирская сервисная компания') return <img src={SSK} alt='SSK' style={{marginRight: '1rem'}}/>
    else if (name === 'ПНМР') return <img src={PNMR} alt='PNMR' style={{marginRight: '1rem'}}/>
    return <div className='one-big-initial-box'>{name.slice(0, 1)}</div>
}