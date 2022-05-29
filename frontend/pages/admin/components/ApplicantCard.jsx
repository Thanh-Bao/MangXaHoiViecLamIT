const ApplicantCard = props => {
    const { name, job, place, jobType } = props;
    return (
        <>
            <div className="col-lg-6 col-md-12">
                <div className="single-applicants-card">
                    <div className="image">
                        <a href="#"><img src="assets/images/applicants/applicants-1.jpg" alt="image" /></a>
                    </div>
                    <div className="content">
                        <h3>
                            <a href="#">{name}</a>
                        </h3>
                        <span>{job}</span>
                        <ul className="job-info">
                            <li><i className="ri-map-pin-line" /> {place}</li>
                            <li><i className="ri-time-line" />  {jobType}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantCard;