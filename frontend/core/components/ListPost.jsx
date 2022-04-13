import { getPosts } from '@/api/post';
import PostCard from '@/components/post/card';
import PostSkeleton from '@/components/skeleton/post';
import { Grid } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '@/reduxTookit/slices/postsIndexSlice';
import { postMapper } from '@/helper/mapper';

const ListPost = props => {

    const [loading, setLoading] = useState(true);
    const { arrPost: posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        getPosts().then(item => {
            const data = item.map(postMapper)
            setLoading(false);
            dispatch(fetchPost(data))
        })
    }, [])

    return (
        <>
            <Grid container spacing={4}>
                {loading && _.range(24).map((item, key) => (
                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={`grid-${key}`}>
                        <PostSkeleton key={`item-${item}`} />
                    </Grid>
                ))}

                {posts.map((item, key) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`grid-${key}`}>
                        <PostCard post={item} key={`grid-${key}`} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ListPost;