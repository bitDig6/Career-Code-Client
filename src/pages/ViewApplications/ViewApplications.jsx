import React from 'react';
import { useLoaderData } from 'react-router';

const ViewApplications = () => {
    const applications = useLoaderData();
    console.log(applications);

    const handleChangeStatus = (e, id) => {
        const updatedStatus = {
            status: e.target.value
        }
        console.log(updatedStatus);
        fetch(`http://localhost:5000/jobApplications/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedStatus)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='w-4/5 mx-auto my-20 min-h-screen'>
            <h1 className='text-3xl font-bold text-center mb-5'>Applications for my posted job</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Applicant Email</th>
                            <th>Resume Link</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, idx) => <tr key={application._id}>
                                <th>{idx + 1}</th>
                                <td>{application.application_email}</td>
                                <td>{application.resume}</td>
                                <td>{application?.status}</td>
                                <td>
                                    <select onChange={(e) => handleChangeStatus(e, application._id)}
                                        defaultValue={application.status || "Change Status"} className="select select-xs">
                                        <option disabled={true}>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;