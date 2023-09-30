import { Draggable } from 'react-beautiful-dnd';

const JobCard = ({ job, status, index }) => {
    if (job.status === status) {
        return (
            <Draggable draggableId={job._id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="card-container">
                            <h3>{job.jobTitle}</h3>
                            <h4>{job.companyName}</h4>
                            <p>${job.salary}</p>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
};

export default JobCard;
