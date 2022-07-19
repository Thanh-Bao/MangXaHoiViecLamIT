import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const RecentAlert = props => {
    const { employee, jobTitle } = props;

    return (
        <li>
            <div className="icon">
                <PersonOutlineIcon style={{'transform': 'translateY(-.4rem)'}}/>
            </div>
            <span>{employee}</span> ứng tuyển cho vị trí <strong>{jobTitle}</strong>
            <button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </li>
    );
}

export default RecentAlert;