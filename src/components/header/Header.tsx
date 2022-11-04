import React, { useState, useEffect } from 'react'
import "./styles.scss"

import { Nav, Navbar, Container} from 'react-bootstrap'
import { Popover, Menu, Position, PeopleIcon, DrawerLeftFilledIcon } from 'evergreen-ui'

import { VectorIcon } from '../../svg/icons'

import { useUserDispatch, signOut } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom"

const linkStyle: object = {
    fontSize: "14px", 
    fontWeight: 500, 
    display: 'inline-block', 
    lineHeight: '49px', 
    height: "100%"
}

const focusLinkStyle: object = {
    fontSize: "14px", 
    fontWeight: 500, 
    display: 'inline-block', 
    lineHeight: '49px', 
    height: "100%",
    color: 'black',
    borderBottom: "3px solid #FED602"
}

function Header() {
    var userDispatch = useUserDispatch();
    const navigate = useNavigate();
    const [pathname, setPathname] = useState<string>('')
    const name: string = localStorage.getItem('name')!
    const role: string = localStorage.getItem('role')!
    const initials: string = !!name ? name.split(" ").map(item => item.slice(0, 1)).reduce((prev, curr) => prev + curr) : '?'

    useEffect(() => {
        setPathname(document.location.pathname.split('/')[1])
    });

    return (
        <Navbar bg="#ffffff" className='navbar'>
            <Container className='navbar-container'>
            <Navbar.Brand href="/">
                <b> Проект <span>| Управление замерами</span></b>
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} style={pathname === 'wells' ? focusLinkStyle : linkStyle} to="/wells">Скважины</Nav.Link>
                <Nav.Link as={Link} style={pathname === 'services' ? focusLinkStyle : linkStyle} to="/services">Подрядчики</Nav.Link>
                <Nav.Link as={Link} style={pathname === 'customers' ? focusLinkStyle : linkStyle} to="/customers">Общества</Nav.Link>
            </Nav>
            <Popover
                position={Position.BOTTOM_RIGHT}
                content={({ close }) => (
                <Menu>
                <Menu.Group>
                    <Link to='/users' style={{textDecoration: 'none'}}><Menu.Item onClick={close} icon={PeopleIcon}>Управление пользователями</Menu.Item></Link>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                    <Menu.Item icon={DrawerLeftFilledIcon} intent="danger" onClick={() => signOut(userDispatch, navigate)}>
                    Выйти из профиля
                    </Menu.Item>
                </Menu.Group>
                </Menu>
            )}
            >
            <button className='person-button'>
                <div className='person-initials'>
                    {initials}
                </div>
                <div className='person-data'>
                    {name}<br/><span>{role}</span>
                </div>
                <VectorIcon/>
            </button>
            </Popover>
            </Container>
        </Navbar>
    )
}

export default Header;