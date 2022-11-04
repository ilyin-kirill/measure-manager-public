import React from 'react'
import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Label} from 'recharts'
import { IData } from '../../types/types';
import "./styles.scss"

interface IChartProps {
    data: IData[];
}

function VerticalPieChart(props : IChartProps) {
    return (
        <div className="stat-card">
            <div className="stat-card-chart">
             Скважин в бурении
             {props.data.map((item, index) => 
                <div className="stat-card-data" key={`${item.name}-${index}`}>
                    <div className='stat-card-dot-text'>
                        <div style={{backgroundColor: item.color, borderRadius: "50%"}} className='stat-card-dot'/>
                        <span style={{fontWeight: 400}}>{ item.name.length > 15 ? item.name.split(" ").map((word) => word.slice(0, 1)).join('').toUpperCase() : item.name }</span>
                    </div>
                    {item.value}
                </div>
            )}
            <div style={{marginTop: "25px"}}>
            <ResponsiveContainer width="100%" height={176}>
                <PieChart>
                <Pie
                    data={props.data}
                    innerRadius={70}
                    outerRadius={88}
                    dataKey="value"
                >
                <Label value={`${props.data.reduce((prev, curr) => prev + curr.value, 0)} всего`} position='center'/>
                {props.data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                    />
                ))}
                </Pie>
                <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
            </div>
            </div>
        </div>
    )
}

export default React.memo(VerticalPieChart)