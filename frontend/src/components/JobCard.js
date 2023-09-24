const JobCard = ({ job }) => {
    return (
        <div className="job-details">
            <h3>{job.jobTitle}</h3>
            <h4>{job.companyName}</h4>
            <p>${job.salary}</p>
        </div>
    );
};

export default JobCard;
