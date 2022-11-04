import React, {useEffect, useState} from 'react'
import "./styles.scss"

import stat from "../../svg/stat.svg"
import navigation from "../../svg/navigation.svg"
import unification from "../../svg/unification.svg"
import chat from "../../svg/chat.svg"
import InputCustom from '../../components/input/InputCustom'
import SelectCustom from '../../components/select/SelectCustom'

import { get_organizations, sign_up } from '../../api/AuthAPI'

import { useUserDispatch, loginUser } from "../../context/UserContext";

import { Button, Carousel } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toaster } from 'evergreen-ui'

interface IOrg {
    id: number;
    name: string;
}

function Login() {
    var userDispatch = useUserDispatch()

    const [organizationData, setOrganizationData] = useState<IOrg[]>([])

    const [showSignUp, setShowSignUp] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(true)
    const [showResetPass, setShowResetPass] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [organization, setOrganization] = useState<string>("")

    const navigate = useNavigate()

    //services_scripts

    const deleteAllLocalData = (): void => {
        setEmail("")
        setPassword("")
        setName("")
        setSurname("")
        setOrganization("")
    }

    const checkSignUpValidity = (): boolean => {
        return !!email && !!password && !!name && !!surname && !!organization
    }
    const checkLoginValidity = (): boolean => {
        return !!email && !!password
    }

    //submits

    const onSubmitSignUp = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (checkSignUpValidity()) {
            sign_up(name, surname, email, organization, password, 0, "User", deleteAllLocalData, false)
            setShowSignUp(false)
            setShowLogin(true)
        } else toaster.notify("Все поля должны быть заполнены!")
    }

    const onSubmitLogin = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (checkLoginValidity())
            loginUser(userDispatch, email, password, navigate)
        else toaster.notify("Все поля должны быть заполнены!")
    }

    //use_effects

    useEffect(() => {
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
        <div>
            <div className="right">
            <Carousel 
                style={{width: "450px", margin: "auto"}}
                controls={false}
            >
                <Carousel.Item interval={3000}>
                    <img src={stat} alt='stat' className='carousel-img'/>
                    <Carousel.Caption>
                    <p className="carousel-header">Наглядная статистика</p>
                    <p className="carousel-description">Статистика по бурению скважин, подрядчикам и обществам</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img src={navigation} alt='navigation' className='carousel-img'/>
                    <Carousel.Caption>
                    <p className="carousel-header">Удобная навигация</p>
                    <p className="carousel-description">Просматривайте существующие скважины и добавляйте новые</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img src={chat} alt='chat' className='carousel-img'/>
                    <Carousel.Caption>
                    <p className="carousel-header">Чат с коллегами</p>
                    <p className="carousel-description">Обменивайтесь сообщениями с коллегами в рамках сопровождения бурения скважины</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img src={unification} alt='unification' className='carousel-img'/>
                    <Carousel.Caption>
                    <p className="carousel-header">Унификация данных</p>
                    <p className="carousel-description">Данные от подрядчика приводятся к единой системе измерений</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
            <div className="left">
            <div className="logo">
                <b> Проект <span>| Управление замерами</span></b>
            </div>
            { showLogin && 
            <form 
                className='loginForm' 
                data-testid='login-form'
                onSubmit={(e: React.SyntheticEvent): void => onSubmitLogin(e)}
            >
                <p className="main-span">Добро пожаловать!</p>
                <p className="extra-span">Пожалуйста, введите свои данные</p>
                <InputCustom
                    type="email"
                    placeholder="Введите email"
                    label="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <InputCustom
                    type="password"
                    placeholder="Введите пароль"
                    label="Пароль"
                    extraLabel="Забыли пароль?"
                    setShowLogin={setShowLogin}
                    setShowResetPass={setShowResetPass}
                    value={password}
                    style={{marginBottom: "40px"}}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Button variant="yellow" type="submit">Продолжить</Button>
                <div className="end-group">
                    <span className='enter-span'>Впервые здесь? </span>
                    <span className="yellow-span" onClick={(): void => {setShowLogin(false); setShowSignUp(true)}} style={{fontSize: "14px"}}>Зарегистрируйтесь</span>
                </div>
            </form>}
            { showResetPass && 
            <form 
                data-testid='reset-password-form'
                className="resetPasswordForm"
            >
                <p className="main-span">Восстановить пароль</p>
                <p className="extra-span">Новый пароль придет на вашу почту</p>
                <InputCustom
                    type="email"
                    placeholder="Введите email"
                    label="Email"
                    value={email}
                    style={{marginBottom: "40px"}}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Button variant="yellow-outline" onClick={(): void => {setShowResetPass(false); setShowLogin(true)}} style={{width: "140px"}}>Назад</Button>
                <Button variant="yellow" style={{width: "246px", float: "right"}}>Продолжить</Button>
            </form>}
            { showSignUp && 
            <form 
                className="signUpForm" 
                data-testid='sign-up-form'
                onSubmit={(e: React.SyntheticEvent): void => onSubmitSignUp(e)}
            >
                <p className="main-span">Создать учетную запись</p>
                <p className="extra-span">У вас уже есть учетная запись? 
                <span className="yellow-span" onClick={() => {setShowSignUp(false); setShowLogin(true)}} style={{fontSize: "20px"}}> Войти</span></p>
                <InputCustom
                    type="email"
                    placeholder="Введите email"
                    label="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <InputCustom
                    type="text"
                    placeholder="Введите имя"
                    label="Имя"
                    style={{display: "inline-block", width: "132px", marginRight: "30px"}}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <InputCustom
                    type="text"
                    placeholder="Введите фамилию"
                    label="Фамилия"
                    style={{display: "inline-block", width: "254px", align: "right"}}
                    value={surname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                />
                <SelectCustom
                    placeholder="Выберите организацию"
                    label="Организация"
                    data={organizationData.map(item => item.name)}
                    value={organization}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOrganization(e.target.value)}
                />
                <InputCustom
                    type="password"
                    placeholder="Введите пароль"
                    label="Пароль"
                    setShowLogin={setShowLogin}
                    setShowResetPass={setShowResetPass}
                    style={{marginBottom: "40px"}}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Button variant="yellow" type="submit">Создать учетную запись</Button>
            </form>}
            <div className="copywrite-span">
                <p>&copy; 2022 АО “ИГиРГИ”. Все права защищены.</p>
            </div>
            </div>
        </div>
    )
}

export default Login;