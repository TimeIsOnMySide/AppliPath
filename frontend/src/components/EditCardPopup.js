import React, { useRef, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useAuthContext } from '../hooks/useAuthContext';

const EditCardPopup = ({ job, fetchJobs }) => {
    const popupRef = useRef(null);
    const [formData, setFormData] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
        setFormData({
            jobTitle: job.jobTitle || '',
            companyName: job.companyName || '',
            jobPostingURL: job.jobPostingURL || '',
            salary: job.salary || '',
            location: job.location || '',
            notes: job.notes || '',
        });
    }, [job]);

    const formSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:4000/api/jobs/${job._id}`,
                {
                    method: 'PATCH', // Use PATCH to update the existing job
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update job.');
            }

            console.log('Job updated successfully!');
            popupRef.current.close(); // Close the popup
            await fetchJobs(); // Call fetchJobs to update the job list
        } catch (error) {
            console.error('Error updating job:', error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <Popup
            ref={popupRef}
            trigger={<button className="btn btn-primary">Edit</button>}
            modal
        >
            <div className="card-form-popup">
                <h3 className="header">Edit Job Card</h3>
                <form onSubmit={formSubmit}>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />

                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />

                    <label>Job Posting URL:</label>
                    <input
                        type="url"
                        name="jobPostingURL"
                        value={formData.jobPostingURL}
                        onChange={handleChange}
                        required
                    />

                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />

                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    <label>Notes:</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
        </Popup>
    );
};

export default EditCardPopup;
