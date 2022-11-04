import React, { useState, useEffect, useRef } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { Checkbox, toaster } from 'evergreen-ui'

import { update_user, delete_user } from '../../api/UserAPI'

import find from '../../svg/find.svg'
import ok from '../../svg/ok.svg'
import deleteIcon from '../../svg/delete.svg'
import arrowRight from '../../svg/arrowRight.svg'
import arrowRightDisabled from '../../svg/arrowRightDisabled.svg'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <div style={{paddingLeft: "1rem"}}>
        <Checkbox ref={resolvedRef} {...rest} />
      </div>
    )
  }
)

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const [showFind, setShowFind] = useState(false)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
        <>
        { showFind &&
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Искать среди ${count} записей...`}
          style={{
            fontSize: '1rem',
            border: '0',
            marginRight: "0.5rem"
          }}
        />}
        <div className="iconBox" onClick={() => setShowFind(!showFind)}>
            <img src={find} alt='findIcon'/>
        </div>
     </>
    )
  }

function TablePagination({ columns, data, title, findFunc, deleteFunc, okFunc, setUser, setNewUser, showModal, selectedFunc}) {
    const filterTypes = React.useMemo(
      () => ({
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true
          })
        },
      }),
      []
    )
  
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state,
      preGlobalFilteredRows,
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      nextPage,
      previousPage,
      setPageSize,
      selectedFlatRows,
      state: { pageIndex },
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
        initialState: { pageIndex: 0 },
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      usePagination,
      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: () => (
              <></>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              selectedFunc ? 
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div> : 
              <></>
            ),
          },
          ...columns,
        ])
      }
    )

    const onClickRow = (row) => {
      setNewUser(false)
      setUser(row.original)
      showModal(true)
    }
    
    useEffect(() => {
        setPageSize(10)
    }, [])
  
    return (
      <div className='table-pagination'>
        {data.length !== 0 ? <table {...getTableProps()}>
          <thead>
            <tr style={{height: "49px"}}>
                <th 
                colSpan={2} 
                style={{backgroundColor: "white", textAlign: "left", paddingLeft: "1rem", borderRadius: "10px"}}
                >
                  {title}
                </th>
                <th 
                colSpan={5} 
                style={{backgroundColor: "white", textAlign: "right", paddingRight: "1rem", borderRadius: "10px"}}
                >
                { findFunc && <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />}
                {selectedFlatRows.length !== 0 && deleteFunc && 
                <div className='iconBox' style={{marginRight: "0.5rem"}} onClick={() => selectedFlatRows.length === 1 ? delete_user(selectedFlatRows[0].original.email) : toaster.notify("Может быть выбрана только 1 строка")}>
                    <img src={deleteIcon} alt='deleteIcon'/>
                </div>}
                {selectedFlatRows.length !== 0 && okFunc && 
                <div className='iconBox' onClick={() => selectedFlatRows.length === 1 ? update_user(selectedFlatRows[0].original, 1) : toaster.notify("Может быть выбрана только 1 строка")}>
                    <img src={ok} alt='okIcon'/>
                </div>}
                </th>
            </tr>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="tr-data">
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} onClick={() => cell.column.Header !== "Статус" && onClickRow(row)}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
            <tr>
                <td colSpan={7} style={{borderBottom: "none", textAlign: "right", verticalAlign: "middle", paddingRight: "1rem"}}>
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
        </table> :
        <table>
          <thead>
            <tr>
              <th colSpan={4}>Новых заявок не обнаружено</th>
            </tr>
          </thead>
        </table>
        }
      </div>
    )
  }

export default TablePagination