import { Avatar, CardHeader } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import UserPortalCard from './portalCard';

const useStyles = makeStyles((theme) => ({
    userPortalCard: {
        padding: 0
    },
    content: theme.comment.content
}));

const UserComment = ({ comment }, props) => {
    const classes = useStyles();

    return (
        <div>  
            <UserPortalCard
                user={comment.user} 
                cardProps={{
                    classes: {
                        root: classes.userPortalCard
                    },
                    subheader: "5 phút trước",
                }} 
            />
            
            <div className={classes.content}>
                {comment.content}
            </div>
        </div>
    )
};

UserComment.propTypes = {
    comment: PropTypes.shape({
        content: PropTypes.string,
        user: UserPortalCard.propTypes.user
    }).isRequired
}

export default UserComment;