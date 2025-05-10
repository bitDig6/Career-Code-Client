import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const [myJobs, setMyJobs] = useState([]);

    useEffect( () => {
        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json() )
            .then( data => {
                setMyJobs(data);
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    } ,[user.email]);

    return (
        <div className='w-4/5 mx-auto my-20 min-h-screen'>
            <h1 className='text-3xl font-bold text-center mb-5'>My Posted Jobs</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Job Type</th>
                            <th>Job Category</th>
                            <th>Application Deadline</th>
                            <th>No. of Applicants</th>
                            <th>View Applications</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myJobs.map((myJob, idx) => <tr key={myJob._id}>
                                <th>{idx + 1}</th>
                                <td>{myJob.tile}</td>
                                <td>{myJob.type}</td>
                                <td>{myJob.category}</td>
                                <td>{myJob.deadline}</td>
                                <td>{myJob?.applicationCount}</td>
                                <td>
                                   <Link to={`/viewApplications/${myJob._id}`}>
                                    <button className='btn btn-link'>View Applications</button>
                                   </Link>
                                </td>
                                <td>
                                    <button  className='btn btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;