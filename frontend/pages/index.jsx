import { getPosts } from '@/api/post';
import PostCard from '@/components/post/card';
import PostSkeleton from '@/components/skeleton/post';
import WebLayout from '@/layout/web';
import Head from '@/layout/web/head';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
   
}));

const Index = props => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((data) => {
            
            setLoading(false);
            setPosts(data);
        })

    }, [posts.length])

    return (
        <>
            <Head />

            <WebLayout>
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
            </WebLayout>
        </>
    )
}

export default Index;