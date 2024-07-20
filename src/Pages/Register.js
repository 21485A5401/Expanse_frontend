import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './css/Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../Utils/api';
const Register = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile_no: "",
        password: "",
    })
    const HandleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/Register', data);
            toast.success(response.data.message);
            // formRef.current.reset();
            navigate('/Login');

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='SignUp_component'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                    background: "#f0eded",
                    padding: '30px',
                    borderRadius: "20px",
                    display: 'flex',
                    flexDirection: 'column',
                    width: "35%"

                }}
                onSubmit={HandleSubmit}
                ref={formRef}
                autoComplete="off"
            >
                <h1 id='header'>SignUp Page</h1>
                <TextField id="outlined-basic-1" label="Name" type='text' name='name' onChange={HandleChange} variant="outlined" autoComplete="off" required />
                <TextField id="outlined-basic-2" label="Email ID" type='email' name='email' onChange={HandleChange} variant="outlined" required />
                <TextField id="outlined-basic-3" type='number' label="Mobile No" name='mobile_no' onChange={HandleChange} variant="outlined" required />
                {/* <TextField id="outlined-basic" type='text' label="Location" variant="outlined" required /> */}
                <TextField id="outlined-basic-7" type='password' label="Password" name='password' onChange={HandleChange} variant="outlined" required />
                <Button variant="contained" type="submit" id='signup_button'><b>Submit</b></Button>
                <p className='tag_p'>You Already have an account ? <Link to={"/Login"} style={{ textDecoration: "auto" }}> SignIn </Link></p>
            </Box>
        </div>
    )
}

export default Register
