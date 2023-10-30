import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import { useAuthContext } from '../hooks/useAuthContext';

const CardFormPopup = ({ fetchJobs }) => {
    const popupRef = useRef(null);
    const { user } = useAuthContext();

    const formSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            return;
        }

        const formData = {
            jobTitle: event.target.elements['job-title'].value,
            companyName: event.target.elements['company-name'].value,
            jobPostingURL: event.target.elements['job-posting-URL'].value,
            salary: parseFloat(event.target.elements['salary'].value),
            location: event.target.elements['location'].value,
            notes: event.target.elements['notes'].value,
            status: 'Need to Apply',
        };

        try {
            const response = await fetch(
                'https://applipath-backend-g1cejbj70-carlys-projects-870d5eba.vercel.app/api/jobs',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save job.');
            }

            popupRef.current.close(); // Close the popup
            await fetchJobs(); // Call fetchJobs to update the job list
        } catch (error) {
            console.error('Error saving job:', error.message);
        }
    };

    return (
        <Popup
            ref={popupRef}
            trigger={
                <button className="btn btn-primary btn-add-job">Add Job</button>
            }
            modal
        >
            <div className="card-form-popup">
                <h3 className="header">New Job Card</h3>
                <form onSubmit={formSubmit}>
                    <label>Job Title:</label>
                    <input type="text" name="job-title" required />

                    <label>Company Name:</label>
                    <input type="text" name="company-name" required />

                    <label>Job Posting URL:</label>
                    <input type="url" name="job-posting-URL" required />

                    <label>Salary:</label>
                    <input type="number" name="salary" />

                    <label>Location:</label>
                    <input type="text" name="location" />

                    <label>Notes:</label>
                    <textarea name="notes" />
                    <button type="submit" className="btn btn-success">
                        Save
                    </button>
                </form>
            </div>
        </Popup>
    );
};

export default CardFormPopup;
