import { getCommentsPost } from '@/api/post';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

import CommentSkeleton from '../skeleton/comment';
import UserComment from '../user/comment';

const useStyles = makeStyles((theme) => ({

}));

const PostComment = ({ post }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false); 
    const [comments, setComments] = useState([]);

    const completeTask = () => {
        setLoading(false);
    }

    const startTask = () => {
        setLoading(true);
    }

    const fetchComments = (postId) => {      
        startTask();

        getCommentsPost(postId).then(payload => {
            setComments(payload);
        });

        completeTask();
    }

    useEffect(() => {
        fetchComments(post._id);
    }, [])

    return (
        <> 
            {comments.map((comment, key) => <UserComment comment={comment} key={`comment-${key}`}/> )} 
            {loading && <CommentSkeleton /> } 
        </>
    )
};

export default PostComment;