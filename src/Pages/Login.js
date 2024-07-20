import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../Utils/api';
const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const HandleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/Login', data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success(response.data.message);
            navigate('/home/Dashboard');
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='SignIn_component'>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={HandleSubmit}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    background: "#f0eded",
                    padding: '30px',
                    borderRadius: "20px",
                    display: 'flex',
                    flexDirection: 'column',
                    width: "35%",
                }}>
                <h1 id='header'>Login Page</h1>
                <TextField id="outlined-basic-1" label="Email" type='email' name='email' onChange={HandleChange} variant="outlined" autoComplete="off" required style={{ width: "96%" }} />
                <TextField id="outlined-basic-2" label="Password" type='password' name='password' onChange={HandleChange} variant="outlined" required style={{ width: "96%" }} />
                <Button variant="contained" type="submit" id='signin_button'  >Login</Button>
                <p id='signup_link'>You don’t have an account ? <Link to={"/Register"} style={{ textDecoration: "auto" }}> SignUp </Link></p>
            </Box>
        </div>
    )
}

export default Login
