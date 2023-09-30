const JobCard = ({ job, status }) => {
    if (job.status === status) {
        return (
            <div className="card-container">
                <h3>{job.jobTitle}</h3>
                <h4>{job.companyName}</h4>
                <p>${job.salary}</p>
            </div>
        );
    }
};

export default JobCard;
