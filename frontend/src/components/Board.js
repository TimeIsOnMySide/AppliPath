import { Droppable } from 'react-beautiful-dnd';
import JobCard from './JobCard';

const Board = ({ title, jobs, fetchJobs }) => {
    return (
        <div className="board">
            <div className="board-header">
                <h2>{title}</h2>
            </div>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div
                        className="droppable"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {jobs && // If i remove the 'jobs &&' part I get a null error on the map function. Do not remove!
                            jobs.map((job, index) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    status={title}
                                    index={index}
                                    fetchJobs={fetchJobs}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Board;
