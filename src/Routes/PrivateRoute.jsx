import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location  = useLocation();

    if(loading){
        return (
            <div>
                <div className='loading loading-spinner'></div>
            </div>
        );
    }

    if(user){
        return children;
    }

    return (
        <Navigate to='/login' state={location?.pathname}></Navigate>
    );
};

export default PrivateRoute;