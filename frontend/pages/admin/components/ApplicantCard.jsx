const ApplicantCard = props => {
    const { name, job, place, jobType } = props;
    return (
        <>
            <div className="col-lg-5 col-md-12">
                <div className="single-applicants-card border-dark">
                    <div className="content ps-4">
                        <h3>
                            <a href="#">{name}</a>
                        </h3>
                        <span>{job}</span>
                        <ul className="job-info">
                            <li className="ps-0"><i className="ri-map-pin-line" /> {place}</li>
                            <li><i className="ri-time-line" />  {jobType}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicantCard;