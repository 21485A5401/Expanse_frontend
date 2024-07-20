import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './css/Sidenav.css';
import Topnav from './Topnav';

const Sidenav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);


    return (
        <div>
            <Topnav />
            <aside className='asideNavbar'>
                {/* <img src='https://sa-vibhotech.vibhohcm.com/assets/admin/images/1/1699619029logo___Vibho_Technologies_Logo_1.png' alt='Company Logo' /> */}
                <div className='asideNavbarDiv'>
                    <Link to="/home/Dashboard" id='link'>
                        <div
                            className={`menu ${isActive("/home/Dashboard") ? "activeRoute" : ""
                                }`}
                        >
                            Dashboard
                        </div>
                    </Link>
                    <Link to="/home/Expanse" id='link'>
                        <div
                            className={`menu ${isActive("/home/Expanse") ? "activeRoute" : ""
                                }`}
                        >
                            Expanse
                        </div>
                    </Link>
                    {/* <Link to="/SendMessages" id='link'>
                        <div
                            className={`menu ${isActive("/SendMessages") ? "activeRoute" : ""
                                }`}
                        >
                            Send Message
                        </div>
                    </Link> */}

                </div>
            </aside>

            <div className='outlet'>
                <Outlet />
            </div>
        </div>
    );
};

export default Sidenav;
