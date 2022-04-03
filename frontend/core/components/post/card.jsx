import { Card, CardContent, Tooltip, Typography, Chip, Stack, IconButton, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import React, { useState } from 'react';
import ShowMore from '../showMore';
import GalleryPostMedia from '../gallery/postMedia';
import { PhotoLibrary, ModeComment } from '@mui/icons-material';
import { roundToNearest5 } from '@/helper/roundNumber';
import PostUserCard from './userCard';
import SharePost from '../share/post';
import ReactPost from '@/components/react/like';
import BookmarkPost from '@/components/bookmark/bookmark';

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
        backgroundColor: theme.palette.primary.main,
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
    }
}));

const PostCard = (props) => {
    const classes = useStyles();

    const { _id, media, content, react, userSave, comment } = props.post;

    return (
        <Card className={classes.contentWrapper}>
            <PostUserCard post={props.post} />

            <Stack spacing={1}>
                <GalleryPostMedia media={media} maximage={4} className={classes.mediaWrapper} />

                <CardContent className={classes.content}>
                    <ShowMore>
                        <Typography variant="body2" fontSize={'14px'} component="p">
                            {content}
                        </Typography>
                    </ShowMore>
                </CardContent>

                <Stack spacing={1} className={classes.content}>
                    <Divider />

                    <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <ReactPost _id={_id} react={react} />
                            
                            <Link href={{
                                pathname: '/post/[slug]',
                                query: { slug: _id }
                            }}>
                                <IconButton component="span" size='small'>
                                    <Tooltip title='Bình luận' aria-label="comment">
                                        <ModeComment />
                                    </Tooltip>
                                </IconButton>
                            </Link> {comment && comment.length > 0 ? comment.length : null}
                            
                            <SharePost post={props.post} />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <BookmarkPost _id={_id} userSave={userSave} isShowNumberLeft={true} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/* <CardContent className={classes.mediaCounter}>
                <Link href={{
                    pathname: '/post/[slug]',
                    query: { slug: _id }
                }}>
                    <Tooltip title="Xem toàn bộ hình">
                        <Chip size='small' className={classes.mediaCount} avatar={<PhotoLibrary />} label={`${media.length < 5 ? media.length : `${roundToNearest5(media.length)}+`}`} />
                    </Tooltip>
                </Link>
            </CardContent> */}

        </Card>
    );
}

export default PostCard;