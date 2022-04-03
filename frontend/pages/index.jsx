import { getPosts } from '@/api/post';
import PostCard from '@/components/post/card';
import PostSkeleton from '@/components/skeleton/post';
import WebLayout from '@/layout/web';
import Head from '@/layout/web/head';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ListPost from '@/components/ListPost';
import { useDispatch } from 'react-redux';
import { updateLoginStatus } from '@/reduxTookit/slices/postsIndexSlice';
import { havedLogin } from "@/helper/account";

const useStyles = makeStyles((theme) => ({

}));

const Index = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLoginStatus(Boolean(havedLogin())));
    }, [])

    return (
        <>
            <Head />
            <WebLayout>
                <br />
                <ListPost />
            </WebLayout>
        </>
    )
}

export default Index;