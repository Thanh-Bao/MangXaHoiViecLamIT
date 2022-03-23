import React, { useEffect, useState } from 'react';
import { Avatar, Container, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Send } from '@mui/icons-material';
import HTMLReactParse from 'html-react-parser';
import _ from 'lodash';
import moment from 'moment-timezone';
import Card from '@mui/material/Card';

import Link from 'next/link';
import { API_URL } from '@/config';

import Head from '@/layout/web/head';
import WebLayout from '@/layout/web';

import { commentPost, getCommentsPost, getPost } from '@/api/post';
import UserPortalCard from '@/components/user/portalCard';
import DotDivider from '@/components/dotDivider';
import ReportTopic from '@/components/report/post';
import CopyLinkToClipboard from '@/components/share/post';
import ReactPost from '@/components/react/like';
import BookmarkPost from '@/components/bookmark/bookmark';
import GalleryPostMedia from '@/components/gallery/postMedia';
import Box from '@mui/material/Box';

import { formatSpacingNumber } from '@/helper/roundNumber';
import UserComment from '@/components/user/comment';
import CommentSkeleton from '@/components/skeleton/comment';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.primary.bgColor,
    },
    mainBox: {
        width: "100%"
    },
    contentWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        padding: theme.article.contentWrapper.padding,
    },
    articleWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        padding: theme.article.contentWrapper.padding,
        color: theme.typography.body2.color,
        marginTop: '16px'
    },
    commentWrapper: {
        padding: '16px',
    },
    userCard: {
        color: theme.typography.body2.color,
        marginBottom: '10px'
    },
    iconButton: {
        color: theme.typography.body2.color,
    },
    subheaderUserCard: {
        ...theme.subheaderUserCard,
        textDecoration: 'none',
    },
    linkPost: theme.linkPost,
}));

const Post = ({ article }) => {
    const classes = useStyles();
    const { user, _id, createdAt, views, react, userSave, content, media } = article;

    const [commentContent, setCommentContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const completeTask = () => {
        setLoading(false);
    }

    const startTask = () => {
        setLoading(true);
    }

    const handleCreateComment = () => {
        commentPost(_id, {
            content: commentContent
        }).then(payload => {
            if (payload) {
                setComments([
                    ...[payload],
                    ...comments
                ])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchComments = (postId) => {
        startTask();

        getCommentsPost(postId).then(payload => {
            setComments(payload);
        });

        completeTask();
    }

    useEffect(() => {
        fetchComments(_id);
    }, [])

    return (
        <>
            <Head
                title={`${user.username} - Bài viết `}
            />
            <WebLayout>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} key='post'>

                            <Paper variant="outlined" square className={classes.articleWrapper}>
                                <UserPortalCard
                                    user={user}
                                    cardProps={{
                                        subheader: <>
                                            <Link
                                                href={{
                                                    pathname: '/post/[slug]',
                                                    query: { slug: _id }
                                                }}
                                                passHref
                                            >
                                                <Tooltip title={moment(createdAt).format('h:mm a DD-MM-YYYY')}><a className={classes.linkPost}>{moment(createdAt).format('DD [Thg] MM, YYYY')}</a></Tooltip>
                                            </Link>
                                            <DotDivider /> {formatSpacingNumber(views)} lượt xem
                                        </>,
                                        action:
                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                                {/* comment */}
                                                <CopyLinkToClipboard />
                                                <BookmarkPost _id={_id} userSave={userSave} isShowNumberRight={false} />
                                                <ReportTopic postId={_id} />
                                            </Stack>,
                                        classes: {
                                            root: classes.userCard
                                        },
                                        subheaderTypographyProps: {
                                            className: classes.subheaderUserCard
                                        }
                                    }}
                                />

                                {HTMLReactParse(content)}
                            </Paper>

                            <GalleryPostMedia media={media} maximage={-1} sx={{ height: 'auto' }} />
                            <Card>
                                <Box ml={3} mt={3} mb={4} >
                                    < ReactPost _id={_id} react={react} />
                                </Box>
                            </Card>

                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key='other' id='comments'>
                            <div className={classes.margin}>
                                <Grid container alignItems="flex-end" className={classes.wrapper} >
                                    <Grid item className={classes.wrapperAvatar} >
                                        <Avatar className={classes.avatar} alt={user.name} src={`${API_URL}${user.avatar.url}`} />
                                    </Grid>
                                    <Grid item className={classes.wrapperInput}>
                                        <TextField
                                            id="input-with-icon-grid"
                                            className={classes.input}
                                            label="Viết bình luận"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleCreateComment()
                                                }
                                            }
                                            }
                                            onChange={e => { setCommentContent(e.target.value) }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end' >
                                                    <IconButton className={classes.sendingComment} aria-label="send comment"> <Send fontSize='small' /> </IconButton>
                                                </InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>

                            {comments.map((comment, key) => <UserComment comment={comment} key={`comment-${key}`} />)}
                            {loading && <CommentSkeleton />}
                        </Grid>
                    </Grid>
                </Container>


            </WebLayout>
        </>
    )
}

Post.getInitialProps = async (ctx) => {
    const { slug } = ctx.query;

    const article = await getPost(slug);

    return { article };
}

export default Post; 