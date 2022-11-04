import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

import { ArrowLeftIcon, ArrowRightIcon } from '../../svg/icons'
import { ICardProps, IBarData } from '../../types/types'
import "./styles.scss"

const MiniBarChart: React.FC<ICardProps<IBarData>> = ({data, page, setPage, length}) => {
    return ( 
        <div className="stat-card">
            <div className="stat-card-bar" style={{paddingBottom: '5px'}}>
            <div style={{marginBottom: '20px'}}>
                <div className="icon-box" onClick={() => page - 1 < 0 ? setPage(length - 1) : setPage(page - 1)}>
                    <ArrowLeftIcon/>
                </div>
                {data.name}
                <div className="icon-box" onClick={() => page + 1 > length - 1 ? setPage(0) : setPage(page + 1)}>
                    <ArrowRightIcon/>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={135}>
                <BarChart
                    data={data.months}
                    barSize={30}
                >
                    <XAxis 
                        style={{fontSize: "12px"}} 
                        dataKey='name' 
                        axisLine={false} 
                        interval={0}
                        tickLine={false}
                    />
                    <YAxis hide={true} domain={[0, 35]}/>
                    <Bar 
                        style={{borderRadius: '5px'}} 
                        dataKey='value' 
                        fill='red' 
                        background={{ fill: '#F6F7F9' }}
                        radius={5}
                    />
                    <Tooltip/>
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MiniBarChart;