import React from 'react';
import { CardHeader, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        ...theme.user.card.avatar,
    },
    root: {
        padding: 0
    },
    content: theme.comment.content
}));

const CommentSkeleton = () => {
    const classes = useStyles();

    return (
        <>
            <CardHeader
                classes={{
                    root: classes.root
                }}
                title={<Skeleton animation="wave" height={10} width="40%" />}
                avatar={<Skeleton animation="wave" variant="circle" className={classes.avatar} />} 
                subheader={<Skeleton animation="wave" height={10} width="20%" />}
            />

            <div className={classes.content}>
                <Skeleton animation="wave" height={10} />
                <Skeleton animation="wave" height={10} />
                <Skeleton animation="wave" height={10} width="60%" />
            </div>
        </>            
    )
}

export default CommentSkeleton;