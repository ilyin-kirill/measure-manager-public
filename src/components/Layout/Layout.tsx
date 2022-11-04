import React from "react"
import {
  Route,
  Routes
} from "react-router-dom"

import Header from "../header/Header"
import Wells from "../../pages/wells/Wells"
import Home from "../../pages/home/Home"
import Services from "../../pages/services/Services"
import Customers from "../../pages/customers/Customers"
import Users from "../../pages/users/Users"

function Layout() { 
    return (
        <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/wells" element={<Wells/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/users" element={<Users/>} />
        </Routes>
        </>
    );
  }
  
  export default Layout;