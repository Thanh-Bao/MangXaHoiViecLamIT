import { Avatar as AvatarMui } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { API_URL } from '../../config';

const useStyles = makeStyles((theme) => ({
    avatar: {
        ...theme.user.card.avatar,
    },
}));

const UserAvatar = ({ user }) => {
    const classes = useStyles();

    return (
        <AvatarMui className={classes.avatar} alt={user.username} src={`${API_URL}${user.avatar}`} />
    )
}
export default UserAvatar; 