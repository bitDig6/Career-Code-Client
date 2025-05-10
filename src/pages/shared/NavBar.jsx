import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/job-application.png';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
    const context = useAuth();
    const { user, logoutUser } = context;

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/myApplications'>My Applications</NavLink></li>
        <li><NavLink to='/addJob'>Add A Job</NavLink></li>
        <li><NavLink to='/myPostedJobs'>My Posted Jobs</NavLink></li>
    </>

    const handleLogut = () => {

        logoutUser()
            .then(() => {
                console.log('logut successful');
            }).catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className='w-12 mr-3' src={logo} alt="" /> Career Code
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button onClick={handleLogut} className='btn'>Logout</button>
                    </>
                        : <>
                            <Link className='btn' to='/register'>Register</Link>
                            <Link to='/login' className="btn">Login</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default NavBar;