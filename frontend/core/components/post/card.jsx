import { Card, CardContent, Tooltip, Typography, Chip, Stack, IconButton, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import React, { useState } from 'react';
import ShowMore from '../showMore';
import GalleryPostMedia from '../gallery/postMedia';
import { PhotoLibrary, ModeComment } from '@mui/icons-material';
import { roundToNearest5 } from '@/helper/roundNumber';
import PostUserCard from './userCard';

const useStyles = makeStyles((theme) => ({
    media: {
        height: '100%',
        maxHeight: '140px',
        width: 'auto',
        margin: 'auto'
    },
    postLink: {
        color: "inherit",
        textDecoration: 'none'
    },
    wrapperHeader: {
        padding: '12px'
    },
    contentWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        border: "1.5px solid #d4d4d4",
        "&:hover": {
            boxShadow: "#acaeb0 3px 8px 15px",
        }
    },
    subheaderUserCard: {
        ...theme.subheaderUserCard,
        textDecoration: 'none',
    },
    content: {
        padding: '0 12px'
    },
    mediaCounter: {
        padding: '0 16px 12px',
    },
    mediaCount: {
        color: theme.typography.body2.color,
        backgroundColor: "##e8e8e8",
        "&:hover" : {
            backgroundColor: "#a6a6a6",
        }
    },
    mediaWrapper: {
        margin: 0
    },
    linkPost: theme.linkPost,
    actionPostWrapper: {

    },
    actionPostItem: {
        textAlign: 'center',
    },
    chipStats: {
        backgroundColor: 'transparent'
    },
    dividerAction: {
        borderColor: '#eaebed45'
    },
}));

const PostCard = (props) => {
    const classes = useStyles();

    const { media, content } = props.post;

    return (
        <Card className={classes.contentWrapper}>
            <PostUserCard post={props.post} />
            <Divider />
            <br/>
            <Stack spacing={1}>
                <CardContent className={classes.content}>
                    <ShowMore>
                        <Typography variant="body2" fontSize={'14px'} component="p">
                            {content}
                        </Typography>
                    </ShowMore>
                </CardContent>
                <CardContent className={classes.mediaCounter}>
                <Link 
                href={{
                    pathname: '/post/[slug]',
                    query: { slug: "_id" }
                }}
                >
                    <Tooltip title="Xem toàn bộ hình">
                        <Chip size='small' className={classes.mediaCount} avatar={<PhotoLibrary />} label={`${media.length < 5 ? media.length : `${roundToNearest5(media.length)}+`}`} />
                    </Tooltip>
                </Link>
            </CardContent>
                <GalleryPostMedia media={media} maximage={4} className={classes.mediaWrapper} />
                <Stack spacing={1} className={classes.content}>
                </Stack>
            </Stack>
        </Card>
    );
}

export default PostCard;

