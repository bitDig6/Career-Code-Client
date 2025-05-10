import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const AddJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddJobs = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const initialData = Object.fromEntries(formData.entries());
        // console.log(initialData);

        const { min, max, currency, ...newJob } = initialData;
        // console.log(newJob);
        newJob.salaryRange = { min, max, currency };
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');

        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Created Job Successfully",
                        icon: "success"
                    });
                    navigate('/myPostedJobs');
                }
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='w-4/5 mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-5'>Post A New Job</h2>
            <form onSubmit={handleAddJobs} className="fieldset space-y-3 *:w-full">
                {/* job title */}
                <label className="label">Job Title</label>
                <input type="text" name='tile' required className="input" placeholder="Job Title" />

                {/* job location */}
                <label className="label">Job Location</label>
                <input type="text" name='location' required className="input" placeholder="Job Location" />

                {/* job type */}
                <label className="label">Job Type</label>
                <select defaultValue="Select a job type" name='type' required className="select">
                    <option disabled={true}>Select a job type</option>
                    <option>Onsite</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Part-time</option>
                    <option>Full-time</option>
                </select>

                {/* job category */}
                <label className="label">Job Category</label>
                <select defaultValue="Select a job category" name='category' required className="select">
                    <option disabled={true}>Select a job category</option>
                    <option>Software Engineering</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Teaching</option>
                    <option>Management</option>
                    <option>DevOps Engineering</option>
                    <option>UI/UX Design</option>
                    <option>Mobile App Development</option>
                </select>

                {/* application deadline */}
                <label className="label">Application Deadline</label>
                <input type="date" name='deadline' required className="input" placeholder="Application Deadline" />

                {/* salary range */}
                <label className="label">Salary Range</label>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                    {/* max */}
                    <div>
                        <input type="number" name='max' required className="input" placeholder="Minimum Salary" />
                    </div>
                    {/* min */}
                    <div>
                        <input type="number" name='min' required className="input" placeholder="Maximum Salary" />
                    </div>
                    {/* currency */}
                    <div>
                        <select defaultValue="Select a currency" name='currency' required className="select">
                            <option disabled={true}>Select a currency</option>
                            <option>bdt</option>
                            <option>usd</option>
                            <option>inr</option>
                        </select>
                    </div>
                </div>

                {/* description */}
                <label className="label">Job Description</label>
                <textarea className="textarea" name='description' required placeholder="Job Description"></textarea>

                {/* company */}
                <label className="label">Company</label>
                <input type="text" name='company' required className="input" placeholder="company" />

                {/* requirements */}
                <label className="label">Requirements</label>
                <textarea className="textarea" name='requirements' required placeholder="Write Each Requirement in a New Line"></textarea>

                {/* responsibilities */}
                <label className="label">Responsibilities</label>
                <textarea className="textarea" name='responsibilities' required placeholder="Write Each Responsibility in a New Line"></textarea>

                {/* status */}
                <label className="label">Job Status</label>
                <input type="text" className="input" name='status' required placeholder="Job Status" />

                {/* hr name */}
                <label className="label">HR Name</label>
                <input type="text" className="input" name='hr_name' required placeholder="HR Name" />
                {/* hr email */}
                <label className="label">HR Email</label>
                <input type="email" className="input" defaultValue={user?.email} name='hr_email' required placeholder="HR Email" />

                {/* company logo */}
                <label className="label">Company Logo</label>
                <input type="url" className="input" name='company_logo' required placeholder="Company Logo URL" />

                <button className="btn btn-neutral mt-4">Post Job</button>
            </form>
        </div>
    );
};

export default AddJobs;