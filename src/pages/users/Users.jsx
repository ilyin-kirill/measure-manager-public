import React, { useState, useEffect, useMemo } from "react"

import { AuthInterceptor } from "../../interceptors/AuthInterceptor"
import { get_organizations } from "../../api/AuthAPI"
import { Switch } from 'evergreen-ui'

import { PlusIcon, MinusIcon } from "../../svg/icons"

import SquareButton from "../../components/buttons/SquareButton"
import SecondNavbar from "../../components/navbar/SecondNavbar"
import TablePagination from "../../components/tables/TablePagination"

import DeleteModal from "../../components/modals/DeleteModal"
import UserModal from "../../components/modals/UserModal"

const navData = ["Управление пользователями", "Заявки на регистрацию"]

function Users() {
    const [usersData, setUsersData] = useState([])
    const [organizationData, setOrganizationData] = useState([])
    const [page, setPage] = useState(0)

    const [user, setUser] = useState({})
    const [newUser, setNewUser] = useState(false)

    const [modalDeleteUserShow, setModalDeleteUserShow] = useState(false);
    const [modalUserShow, setModalUserShow] = useState(false);

    const updateUsersData = ()=> {
        //console.log(usersData)
        // let arr = usersData
        // console.log(arr)
        // let user = arr.find(item => item.email == original.email)
        // console.log(user)
        // let index = arr.findIndex(item => item.email == original.email)
        // console.log(index)
        // user = e.target.value ? {...user, "status": 1} : {...user, "status": 2}
        // console.log(user)
        // arr.splice(index, 1)
        // console.log(arr)
        // arr.splice(index, 0, user)
        // console.log(arr)
        //setUsersData(arr)
    }

    const columns = useMemo(
        () => [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Фамилия',
            accessor: 'surname',
          },
          {
            Header: 'Имя',
            accessor: 'name',
          },
          {
            Header: 'Роль',
            accessor: 'role',
          },
          {
            Header: 'Организация',
            accessor: 'organization'
          },
          {
            Header: 'Статус',
            accessor: 'status',
            Cell: ({ row: { original } }) => (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Switch 
                    checked={original.status === 1} 
                    height={20} 
                    style={{marginRight: "0.5rem"}}
                    onChange={(e) => updateUsersData()}
                />
                {original.status === 1 ? <span>Разблокирован</span> : <span>Заблокирован</span>}
                </div>
            ),
          },
        ],
        []
    )
    const columnsRegister = useMemo(
        () => [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Фамилия',
            accessor: 'surname',
          },
          {
            Header: 'Имя',
            accessor: 'name',
          },
          {
            Header: 'Организация',
            accessor: 'organization'
          },
        ],
        []
    )

    const getUsersData = async () => {
        await fetch(process.env.REACT_APP_API+'auth/get_users', { 
        headers : { 
          'Content-Type': 'application/json'
         }
        }) 
        .then(response=>response.json())
        .then(data=>{
            setUsersData(data)
        })
    }

    useEffect(() => {
        AuthInterceptor();
        getUsersData();
        get_organizations()
        .then(response=>response.json())
        .then(data=>{
            setOrganizationData(data)
        })
        .catch(error => {
            console.log('Error: ' + error.message)
        })
    }, [])

    return (
        <>
        <DeleteModal 
          show={modalDeleteUserShow} 
          onHide={() => setModalDeleteUserShow(false)} 
          data={usersData.filter((item) => item.status !== 0).map((i) => i.email)}
          label="Email"
          placeholder="Выберите email"
          type="user"
        />
        <UserModal 
            show={modalUserShow} 
            orgdata={organizationData} 
            user={user}
            new_user={newUser}
            onHide={() => {setUser({ email: '' }); setModalUserShow(false);}} 
        />
        <SecondNavbar data={navData} page={page} setPage={setPage}/>
        <div className="button-block">
            <div className="buttons">
                <SquareButton 
                  text="Добавить пользователя" 
                  onClick={() => { setNewUser(true); setModalUserShow(true);}}
                >
                  <PlusIcon/>
                </SquareButton>
                <SquareButton
                  text="Удалить пользователя"
                  onClick={() => setModalDeleteUserShow(true)}
                >
                  <MinusIcon/>
                </SquareButton>
            </div>
        </div>
        <div className="main-block">
            {page === 0 && 
            <TablePagination 
                columns={columns} 
                data={usersData.filter(item => item.status !== 0)} 
                title="Список пользователей" 
                findFunc={true} 
                setUser={setUser}
                setNewUser={setNewUser}
                showModal={setModalUserShow}
            />}
            {page === 1 && 
            <TablePagination 
                columns={columnsRegister}
                data={usersData.filter(item => item.status ===  0)} 
                title="Список заявок на регистрацию" 
                deleteFunc={true} 
                okFunc={true} 
                selectedFunc={true}
            />}
        </div>
        </>
    )
}

export default Users;