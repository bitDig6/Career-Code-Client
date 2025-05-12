import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            if(error.status === 401 || error.status === 403){
                console.log('response error status', error.status);
                console.log('logging out the user....');
                logoutUser()
                    .then( () => {
                        console.log('redirecting to the login page....');
                        navigate('/login');
                    })
                    .catch(error => console.log(error))
            }

            return Promise.reject(error);
        });
    }, []);

    return axiosInstance;
};

export default useAxiosSecure;