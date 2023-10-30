import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import EditCardPopup from './EditCardPopup';
import JobDetailsPopup from './JobDetailsPopup';
import { useAuthContext } from '../hooks/useAuthContext';

const JobCard = ({ job, status, index, fetchJobs }) => {
    const { user } = useAuthContext();

    const handleConfirmDelete = async () => {
        if (!user) {
            return;
        }
        try {
            await fetch(
                `https://applipath-backend-g1cejbj70-carlys-projects-870d5eba.vercel.app/api/jobs/${job._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            await fetchJobs();
        } catch (error) {
            console.error('Error deleting job: ', error);
        }
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
                            <JobDetailsPopup job={job} />
                            <EditCardPopup
                                job={job}
                                fetchJobs={fetchJobs}
                            />{' '}
                            <ConfirmDeletePopup
                                handleConfirmDelete={handleConfirmDelete}
                            />
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
};

export default JobCard;
