import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useAuth();
    const { email } = user;
    const [userApplications, setUserApplications] = useState([]);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // fetch(`http://localhost:5000/jobApplications?email=${email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setUserApplications(data);
        //     }).catch(error => {
        //         console.log(error);
        //     })
    //    
        axiosSecure.get(`/jobApplications?email=${email}`)
            .then(res => setUserApplications(res.data))

    }, [email]);

    const handleDeleteApplication = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/jobApplications/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "Deletion Successful",
                                icon: "success"
                            });
                            const applications = [...userApplications];
                            const remaining = applications.filter(application => application._id !== id )
                            setUserApplications(remaining);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    }

    return (
        <div className="w-4/5 mx-auto my-20 min-h-screen">
            <h1 className='text-3xl font-bold text-center mb-5'>My Applications</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Company Name</th>
                            <th>Job Type</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userApplications.map((userApplication, idx) => <tr key={userApplication._id}>
                                <th>{idx + 1}</th>
                                <td>{userApplication.company}</td>
                                <td>{userApplication.jobType}</td>
                                <td>{userApplication.category}</td>
                                <td>{userApplication.location}</td>
                                <td>
                                    <button onClick={() => handleDeleteApplication(userApplication._id)} className='btn btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;