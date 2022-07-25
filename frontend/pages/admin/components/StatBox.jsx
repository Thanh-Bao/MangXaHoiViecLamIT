import PostAddIcon from '@mui/icons-material/PostAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StatBox = props => {
    const title = props.children;
    const { count } = props;
    const [numOfPost, setNumOfPost] = useState(0);
    const [numOfUser, setNumOfUser] = useState(0);
    const [numOfCV, setNumOfCV] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:80/api/v1/post/all')
        .then((response) => {
            setNumOfPost(response.data.length);
        });

        axios.get('http://localhost:80/api/v1/user/all')
        .then((response) => {
            setNumOfUser(response.data.length);
        });
    }, {});

    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <PostAddIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Bài tuyển dụng</span>
                    <h3>{numOfPost}</h3>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <BadgeIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Số lượng ứng tuyển</span>
                    <h3>{numOfUser}</h3>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">  
                <div className="stats-fun-fact-box">
                    <div className='icon-box'>
                        <ContactMailIcon sx={{ fontSize: '32px' }} />
                    </div>
                    <span className="sub-title">Số lượng CV</span>
                    <h3>3</h3>
                </div>
            </div>
        </>
    )
}

export default StatBox;