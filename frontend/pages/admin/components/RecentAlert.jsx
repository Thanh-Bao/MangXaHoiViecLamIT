const RecentAlert = props => {
    const { employee, jobTitle } = props;

    return (
        <li>
            <div className="icon">
                <i className="ri-bookmark-line" />
            </div>
            <span>{employee}</span> ứng tuyển cho vị trí <strong>{jobTitle}</strong>
            <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </li>
    );
}

export default RecentAlert;