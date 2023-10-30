import Popup from 'reactjs-popup';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const JobDetailsPopup = ({ job }) => {
    // Check if a location is provided
    const hasLocation = job.location && job.location.trim() !== '';

    //fetch Google Maps data based on the entered location
    const fetchGoogleMapsData = async (location) => {
        try {
            const response = await fetch(
                `https://applipath-backend.vercel.app/geocode?address=${location}`
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log('successful');
                return data;
            } else {
                console.error('Failed to fetch Google Maps data');
                return null;
            }
        } catch (error) {
            console.error('Error fetching Google Maps data:', error);
            return null;
        }
    };

    // State to control if the map should be shown
    const [showMap, setShowMap] = useState(false);

    const handleViewMap = async () => {
        if (hasLocation && window.google) {
            const mapContainer = document.getElementById('map');

            if (mapContainer) {
                const location = job.location;

                const googleMapsData = await fetchGoogleMapsData(location);

                if (googleMapsData) {
                    const { lat, lng } = googleMapsData;
                    const map = new window.google.maps.Map(mapContainer, {
                        center: { lat, lng },
                        zoom: 8,
                    });

                    new window.google.maps.Marker({
                        position: { lat, lng },
                        map,
                    });
                    setShowMap(true);
                } else {
                    console.log('Google Maps data not retrieved.');
                }
            } else {
                console.log('Map container not found.');
            }
        } else {
            console.log(
                'Location not available or Google Maps API not loaded.'
            );
        }
    };

    const { format } = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Popup
            trigger={
                <button className="btn btn-primary btn-details">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ color: '#ffffff' }}
                    />
                </button>
            }
            modal
        >
            <div className="card-form-popup job-details-popup">
                <h3 className="header">Job Details</h3>
                <div>
                    <strong>Job Title:</strong> {job.jobTitle}
                </div>
                <div>
                    <strong>Company Name:</strong> {job.companyName}
                </div>
                <div>
                    <strong>Job Posting URL:</strong>{' '}
                    <a
                        href={job.jobPostingURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {job.jobPostingURL}
                    </a>
                </div>
                <div>
                    <strong>Salary:</strong> {format(job.salary)}
                </div>
                <div>
                    <strong>Location:</strong> {job.location}
                </div>
                <div>
                    <strong>Notes:</strong> {job.notes}
                </div>
                {hasLocation && (
                    <button className="btn btn-primary" onClick={handleViewMap}>
                        <FontAwesomeIcon
                            icon={faMapLocationDot}
                            style={{ color: '#ffffff' }}
                        />
                    </button>
                )}
                <div
                    className="map-container"
                    id="map"
                    style={{ display: showMap ? 'block' : 'none' }}
                ></div>
            </div>
        </Popup>
    );
};

export default JobDetailsPopup;
