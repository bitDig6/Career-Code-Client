import React, { useContext, useState } from 'react';
import registerLottie from '../../assets/lottieReg.json';
import Lottie from 'lottie-react';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        const passwordTest = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordTest.test(password)) {
            setError('Password must contain at least 6 characters, one Uppercase, and  one lowercase letter');
            return;
        }

        createUser(email, password)
            .then(res => {
                console.log(res.user);
            }).catch(error => {
                setError(error.message);
                console.log(error);
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
                        <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
                        <form onSubmit={handleRegister} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            {
                                error && <p className='text-red-500'>*{error}</p>
                            }
                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;