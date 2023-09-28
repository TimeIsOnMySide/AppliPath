// This is the dashboard where you can see all the job cards in their respective boards
import { useEffect, useState } from 'react';

// Components
import JobCard from '../components/JobCard';

const Home = () => {
    const [jobs, setJobs] = useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch('http://localhost:4000/api/jobs');
            const json = await response.json();

            if (response.ok) {
                setJobs(json);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="home flex-container">
            <div className="board">
                <div className="board-header">
                    <h2>Need to Apply</h2>
                </div>
                {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
            <div className="board flex-item">
                <div className="board-header">
                    <h2>Applied</h2>
                </div>
                {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
            <div className="board flex-item">
                <div className="board-header">
                    <h2>Interview</h2>
                </div>
                {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
            <div className="board flex-item">
                <div className="board-header">
                    <h2>Offer Recieved</h2>
                </div>
                {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
            <div className="board flex-item">
                <div className="board-header">
                    <h2>Rejected</h2>
                </div>
                {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
        </div>
    );
};

export default Home;
