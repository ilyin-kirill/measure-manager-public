import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import InputCustom from '../input/InputCustom';
import SelectCustom from '../select/SelectCustom';
import ModalButton from '../buttons/ModalButton';

import { sign_up } from '../../api/AuthAPI'
import { update_user } from '../../api/UserAPI'
import { toaster } from 'evergreen-ui';
import { IUser } from '../../types/types'

interface IUserProps {
    show: boolean;
    onHide: () => void;
    user: IUser;
    new_user: boolean;
    orgdata: { name: string, id: number }[];
}

const UserModal: React.FC<IUserProps> = ({ show, onHide, user, new_user, orgdata }) => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string | undefined>('');
    const [surname, setSurname] = useState<string | undefined>('');
    const [organization, setOrganization] = useState<string | undefined>('');
    const [role, setRole] = useState<string | undefined>('');

    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

    const roles: string[] = ["Admin", "User", "Viewer"]

    ////////////////////////////////////временное решение, возможно потом вывести отдельно
    const deleteAllLocalData = (): void => {
        setEmail('')
        setName('')
        setSurname('')
        setOrganization('')
        setRole('')
    }

    const onSubmitSignUp = (): void => {
        if (name && surname && email && organization && role) {
            sign_up(name, surname, email, organization, "Qwe123!!!", 1, role, deleteAllLocalData, true)
        } else toaster.notify("Все поля должны быть заполнены!") 
    }

    const onSubmitUpdate = (): void => {
    if (name && surname && email && organization && role)
        update_user(sendUser, user.status)
    else toaster.notify("Все поля должны быть заполнены!") 
    }

    useEffect((): void => {
        if (!!user) {
            setEmail(user.email)
            setName(user.name)
            setSurname(user.surname)
            setOrganization(user.organization)
            setRole(user.role)
        } else {
            deleteAllLocalData()
        }
    }, [user, new_user])

    const sendUser: IUser = {
        "email": email,
        "name": name,
        "surname": surname,
        "organization": organization,
        "role": role
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-container'>
            <Modal.Header closeButton style={{border: "none", padding: "2rem 3rem 0 3rem"}}>
            </Modal.Header>
            <Modal.Body style={{padding: "0 3rem 0 3rem"}}>
                <div style={{width: "100%"}}>
                    <InputCustom
                        type="email"
                        blue={true}
                        placeholder="Введите email"
                        label="Email"
                        value={email}
                        onChange={(e: InputEvent): void => setEmail(e.target.value)}
                    />
                    <InputCustom
                        type="text"
                        blue={true}
                        placeholder="Введите имя"
                        label="Имя"
                        value={name}
                        onChange={(e: InputEvent): void => setName(e.target.value)}
                    />
                    <InputCustom
                        type="text"
                        blue={true}
                        placeholder="Введите фамилию"
                        label="Фамилия"
                        value={surname}
                        onChange={(e: InputEvent): void => setSurname(e.target.value)}
                    />
                    <SelectCustom
                        placeholder="Выберите организацию"
                        blue={true}
                        label="Организация"
                        data={orgdata.map(item => item.name)}
                        value={organization}
                        onChange={(e: SelectEvent): void => setOrganization(e.target.value)}
                    />
                    <SelectCustom
                        placeholder="Выберите роль"
                        blue={true}
                        data={roles}
                        label="Роль"
                        value={role}
                        onChange={(e: SelectEvent): void => setRole(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer style={{border: "none", padding: "0 3rem 2rem 3rem"}}>
                <ModalButton onClick={(): void => new_user ? onSubmitSignUp() : onSubmitUpdate()} text="Сохранить"/>
            </Modal.Footer>
            </div>
        </Modal>
    );
}

export default UserModal;