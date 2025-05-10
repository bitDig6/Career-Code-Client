import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'

const JobApply = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleJobApplication = event => {
        event.preventDefault();

        const form = event.target;

        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;

        const jobApplication = {
            job_id: id,
            application_email: user.email,
            linkedin,
            github,
            resume
        }

        fetch('http://localhost:5000/jobApplications', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(jobApplication)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Application Successful",
                        icon: "success"
                    });
                    navigate('/myApplications');
                }
            }).catch(error => console.log(error))
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="my-4 text-5xl font-bold text-center">Apply To Job</h1>
                        <form onSubmit={handleJobApplication} className="fieldset">
                            <label className="label">LinkedIn URL</label>
                            <input type="url" name='linkedin' className="input" placeholder="LinkedIn URL" />
                            <label className="label">GitHub URL</label>
                            <input type="url" name='github' className="input" placeholder="GitHub URL" />
                            <label className="label">Resume URL</label>
                            <input type="url" name='resume' className="input" placeholder="Resume URL" />

                            <button className="btn btn-neutral mt-4">Apply</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;