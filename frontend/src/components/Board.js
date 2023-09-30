import JobCard from './JobCard';

const Board = ({ title, jobs }) => {
    return (
        <div className="board">
            <div className="board-header">
                <h2>Need to Apply</h2>
            </div>
            {jobs &&
                jobs.map((job) => (
                    <JobCard key={job._id} job={job} status={title} />
                ))}
        </div>
    );
};

export default Board;
