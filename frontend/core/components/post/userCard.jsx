import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';
import DotDivider from '../dotDivider';
import UserPortalCard from '../user/portalCard';
import { formatSpacingNumber } from '@/helper/roundNumber';

const useStyles = makeStyles((theme) => ({
    wrapperHeader: {
        padding: '7px 12px'
    },
    contentWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
    },
    subheaderUserCard: {
        ...theme.subheaderUserCard,
        textDecoration: 'none',
    },
    linkPost: {
        ...theme.linkPost, 
        fontSize: '10.5px'
    }
}));

const PostUserCard = (props) => {
    const classes = useStyles();
    const { postLink = 'post', cardProps } = props;
    const { _id, media, content, user, createdAt, views } = props.post;

    return (
        <UserPortalCard
            user={user}
            {...props}
            cardProps={{
                className: classes.wrapperHeader,
                subheader: <>
                    <Link href={{
                        pathname: `/${postLink}/[slug]`,
                        query: { slug: _id }
                    }}>
                        <Tooltip title={moment(createdAt).format('HH:mm DD-MM-YYYY')}>
                            <a className={classes.linkPost}>{moment(createdAt).format('DD [Thg] MM, YYYY')}<DotDivider />{formatSpacingNumber(views)} lượt xem </a> 
                        </Tooltip>
                    </Link>
                </>,
                subheaderTypographyProps: {
                    className: classes.subheaderUserCard
                },
                ...cardProps
            }}
        />
    );
}

export default PostUserCard;