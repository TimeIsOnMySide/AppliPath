// This is the dashboard where you can see all the job cards in their respective boards
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardFormPopup from '../components/CardFormPopup';

// Components
import Board from '../components/Board';

const Home = () => {
    const [jobs, setJobs] = useState(null);

    const fetchJobs = async () => {
        const response = await fetch('http://localhost:4000/api/jobs');
        const json = await response.json();

        if (response.ok) {
            setJobs(json);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        // If the item was dropped outside a droppable area
        if (!destination) return;

        // If the item was dropped in the same position within the same board
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Get the new status based on the destination droppableId
        const newStatus = destination.droppableId;

        // Copy the jobs array to avoid mutating the state directly
        const updatedJobs = [...jobs];

        // If the source and destination boards are the same
        if (source.droppableId === destination.droppableId) {
            // Reorder jobs within the same board
            const reorderedJobs = [...updatedJobs];
            const [removedJob] = reorderedJobs.splice(source.index, 1);
            reorderedJobs.splice(destination.index, 0, removedJob);

            // Update the state with the reordered jobs
            setJobs(reorderedJobs);
        } else {
            // Update the status of the dragged job
            const updatedJobs = jobs.map((job) => {
                if (job._id === draggableId) {
                    return { ...job, status: newStatus };
                }
                return job;
            });
            setJobs(updatedJobs);
        }

        // Update the job's status in the database
        try {
            await fetch(`http://localhost:4000/api/jobs/${draggableId}`, {
                method: 'PATCH', // Use PATCH method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error('Error updating job status:', error);
        }
    };

    return (
        <>
            <CardFormPopup fetchJobs={fetchJobs} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="home flex-container">
                    <Board
                        title="Need to Apply"
                        jobs={jobs?.filter(
                            // Use filter so that when I get the index from the map function in the Board component, the indicies are consecutive numbers
                            (job) => job.status === 'Need to Apply'
                        )}
                        fetchJobs={fetchJobs}
                    />
                    <Board
                        title="Applied"
                        jobs={jobs?.filter((job) => job.status === 'Applied')}
                        fetchJobs={fetchJobs}
                    />
                    <Board
                        title="Interview"
                        jobs={jobs?.filter((job) => job.status === 'Interview')}
                        fetchJobs={fetchJobs}
                    />
                    <Board
                        title="Offer Recieved"
                        jobs={jobs?.filter(
                            (job) => job.status === 'Offer Recieved'
                        )}
                        fetchJobs={fetchJobs}
                    />
                    <Board
                        title="Rejected"
                        jobs={jobs?.filter((job) => job.status === 'Rejected')}
                        fetchJobs={fetchJobs}
                    />
                </div>
            </DragDropContext>
        </>
    );
};

export default Home;
