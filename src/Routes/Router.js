import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login.js';
import Register from '../Pages/Register.js';
import Dashboard from '../Pages/Dashboard.js';
import Sidenav from '../Components/Sidenav.js';
import Expanse from '../Pages/Expanse.js';



const Router = () => {
    const token = localStorage.getItem('token');
    let authenticated = false;
    if (token) {
        authenticated = true;
    }
    if (!authenticated) {
        return (
            <Routes>
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='*' element={<Navigate to={"/Login"} />} />
            </Routes>
        )
    } else if(authenticated === true) {
        return (
            <Routes>
                <Route path='/home' element={<Sidenav />} >
                    <Route path='/home/Dashboard' element={<Dashboard />} />
                    <Route path='/home/Expanse' element={<Expanse />} />
                </Route>
            </Routes>
        )
    }

}

export default Router
