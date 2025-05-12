import React, { useContext, useState } from 'react';
import registerLottie from '../../assets/lottieReg.json';
import Lottie from 'lottie-react';
import AuthContext from '../../context/AuthContext/AuthContext';
// import { useLocation, useNavigate } from 'react-router';
// import axios from 'axios';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state || '/';

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        
        loginUser(email, password)
            .then(res => console.log(res.user))
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={registerLottie}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            {
                                error && <p className='text-red-500'>*{error}</p>
                            }
                            <button className="btn btn-neutral mt-4">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;