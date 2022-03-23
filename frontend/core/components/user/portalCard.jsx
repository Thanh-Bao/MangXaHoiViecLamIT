import { CardHeader } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import UserAvatar from './userAvatar';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
    avatar: {
        ...theme.user.card.avatar,
    },
    title: {
        fontWeight: 700,
        fontSize: '13px'
    },
    wrapper: {
        padding: '0px'
    },
    linkPost: theme.linkPost
}));

const UserPortalCard = ({ user, cardProps = {} }) => {
    const classes = useStyles();

    return (
        <CardHeader
            avatar={
                <Link href={{
                    pathname: "/profile/[username]",
                    query: { username: user.username }
                }}>
                    <Tooltip title="Xem trang cá nhân">
                        <a className={classes.linkPost}><UserAvatar user={user} /></a>
                    </Tooltip>
                </Link>

            }
            title={user.username}
            className={classes.wrapper}
            {...cardProps}
            classes={{
                ...cardProps.classes,
                title: classes.title
            }}
        />
    )
}

UserPortalCard.propTypes = {
    cardProps: PropTypes.object,
    user: PropTypes.shape({
        username: PropTypes.string,
        avatar: PropTypes.string,
    }).isRequired
}

export default UserPortalCard; 