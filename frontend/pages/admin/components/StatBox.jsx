import PostAddIcon from '@mui/icons-material/PostAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const StatBox = props => {
    const title = props.children;
    const { count } = props;
    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <PostAddIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Bài tuyển dụng</span>
                    <h3>100</h3>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <BadgeIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Số lượng ứng tuyển</span>
                    <h3>6382</h3>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <ContactMailIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Số lượng CV</span>
                    <h3>3154</h3>
                </div>
            </div>
        </>
    )
}

export default StatBox;