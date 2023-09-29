// This is the dashboard where you can see all the job cards in their respective boards
import { useEffect, useState } from 'react';
import boardData from '../boardData/board-data'; // Board data for drag and drop
import { Droppable } from 'react-beautiful-dnd';

// Components
import JobCard from '../components/JobCard';

const Home = () => {
    const [jobs, setJobs] = useState(null);
    const [boards, setBoards] = useState(boardData);

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

    return boards.columnOrder.map((columnId) => {
        const column = boards.columns[columnId];
        const jobCards = column.jobCardIds.map(
            (jobCardId) => jobCards[jobCardId]
        );
        return (
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                        className="board flex-item"
                    >
                        <div className="board-header">
                            <h2>{column.title}</h2>
                        </div>
                    </div>
                )}
            </Droppable>
        );
    });
    // return (
    //     <div className="home flex-container">
    //         <div className="board flex-item">
    //             <div className="board-header">
    //                 <h2>Need to Apply</h2>
    //             </div>
    //             {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
    //         </div>
    //         <div className="board flex-item">
    //             <div className="board-header">
    //                 <h2>Applied</h2>
    //             </div>
    //         </div>
    //         <div className="board flex-item">
    //             <div className="board-header">
    //                 <h2>Interview</h2>
    //             </div>
    //         </div>
    //         <div className="board flex-item">
    //             <div className="board-header">
    //                 <h2>Offer Recieved</h2>
    //             </div>
    //         </div>
    //         <div className="board flex-item">
    //             <div className="board-header">
    //                 <h2>Rejected</h2>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Home;
