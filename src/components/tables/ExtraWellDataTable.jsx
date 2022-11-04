import React from 'react';
import { useTable, usePagination } from 'react-table';
import arrowRight from '../../svg/arrowRight.svg'
import arrowRightDisabled from '../../svg/arrowRightDisabled.svg'
import { generateColor } from '../../scripts'

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  React.useEffect(() => {
    setPageSize(8);
  }, [])

  return (
    <div className='table-welldata'>
      <table {...getTableProps()} style={{width: '100%'}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    console.log(cell)
                  return (
                    <td {...cell.getCellProps()}>
                        { cell.column.Header === 'Скважина' ?
                            <div className='one-well-info'>
                                <div className='one-big-initial-box' style={{backgroundColor: generateColor()}}>{cell.row.original.subsidiary.slice(0, 1)}</div>
                                <div className='one-well-text-info'>
                                    {cell.row.original.subsidiary}<br/>
                                    {`${cell.row.original.bush}, ${cell.row.original.well}`}
                                </div>
                            </div> 
                        : cell.render('Cell')}
                    </td> 
                    )
                })}
              </tr>
            )
          })}
          <tr>
            <td colSpan={2} style={{borderBottom: "none", textAlign: "right", verticalAlign: "middle"}}>
                <span style={{marginRight: "1rem"}}>
                Страница{' '}
                <strong>
                    {pageIndex + 1} из {pageOptions.length}
                </strong>
                </span>
                <div className="icon-box" onClick={() => canPreviousPage && previousPage()}>
                    <img className="iconRotate" src={ canPreviousPage ? arrowRight : arrowRightDisabled } alt='iconArrowRotate'/>
                </div>
                {"   "}
                <div className="icon-box" onClick={() => canNextPage && nextPage()}>
                    <img src={ canNextPage ? arrowRight : arrowRightDisabled} alt='iconArrow'/>
                </div>
            </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

function ExtraWellDataTable({ data, type }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Скважина',
        accessor: 'subsidiary'
      },
      {
        Header: type !== 'in_drilling' ? type === 'pending' ? 'Плановая дата начала бурения' : 'Дата окончания бурения' : 'Дата начала бурения',
        accessor: 'bush'
      },
    ],
    [type]
  )

  return (
      <Table columns={columns} data={data} />
  )
}

export default ExtraWellDataTable;