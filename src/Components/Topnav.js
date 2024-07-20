import { Button } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/Topnav.css';

const Topnav = () => {
    const navigate = useNavigate();

    const HandleClick = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('Role');
        navigate('/SignIn');
        window.location.reload();
        // setTriggerRefresh(prev => prev + 1);
    }
    const Token = localStorage.getItem('token');
    return (
        <header className='topnav_header'>
            {/* <h3>Hi, {data.name}</h3> */}
            {/* <Link to={'/ProfileUpdate'} >
                <img src={Hearder_logo} alt="header Logo" />
            </Link> */}
            <Button variant="contained" type="logout" onClick={HandleClick} >Logout</Button>
        </header>
    )
}

export default Topnav
