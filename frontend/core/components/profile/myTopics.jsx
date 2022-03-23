import { getPostByUser } from '@/api/post';
import PostCard from '@/components/post/card';
import PostSkeleton from '@/components/skeleton/post';
import { Grid } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from "react";

const MyTopics = (props) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const { user } = props;

    useEffect(() => {
        getPostByUser(user._id).then(payload => {
            setLoading(false);

            setPosts(payload);
        })

    }, [posts.length])

    return (
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
    )
}

export default MyTopics;
