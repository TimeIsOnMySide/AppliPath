import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ConfirmDeletePopup from './ConfirmDeletePopup';

const JobCard = ({ job, status, index, fetchJobs }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:4000/api/jobs/${job._id}`, {
                method: 'DELETE',
            });
            await fetchJobs();
        } catch (error) {
            console.error('Error deleting job: ', error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

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
                            <button onClick={handleDeleteClick}>Delete</button>
                            <ConfirmDeletePopup
                                open={showConfirmation}
                                handleConfirmDelete={handleConfirmDelete}
                                handleCancelDelete={handleCancelDelete}
                            />
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
};

export default JobCard;
