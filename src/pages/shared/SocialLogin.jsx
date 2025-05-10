import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';

const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then( res => {
                console.log(res.user);
            }).catch( error => {
                console.log(error.message);
            })
    }

    return (
        <div className='m-4'>
            <div className='divider'>OR</div>
            <button onClick={handleGoogleLogin} className='btn'>Login With Google</button>
        </div>
    );
};

export default SocialLogin;