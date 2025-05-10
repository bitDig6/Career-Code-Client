import React, { useEffect, useState } from 'react';
import HotJobsCard from './HotJobsCard';

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [dataLoad, setDataLoad] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setDataLoad(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className='my-20'>
            <h1 className='text-3xl font-bold text-center mb-5'>Hot Jobs</h1>
            {
                dataLoad &&
                    <div className='flex justify-center'>
                        <div className='loading loading-spinner'></div>
                    </div>
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16'>
                {
                    jobs.map(job => <HotJobsCard key={job._id} job={job}></HotJobsCard>)
                }
            </div>
        </div>
    );
};

export default HotJobs;