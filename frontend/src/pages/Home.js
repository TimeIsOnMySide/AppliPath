// This is the dashboard where you can see all the job cards in their respective boards
import { useEffect, useState } from 'react';

// Components
import Board from '../components/Board';

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
            <Board title="Need to Apply" jobs={jobs} />
            <Board title="Applied" jobs={jobs} />
            <Board title="Interview" jobs={jobs} />
            <Board title="Offer Recieved" jobs={jobs} />
            <Board title="Rejected" jobs={jobs} />
        </div>
    );
};

export default Home;
