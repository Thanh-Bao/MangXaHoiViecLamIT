import { getPosts } from '@/api/post';
import PostCard from '@/components/post/card';
import PostSkeleton from '@/components/skeleton/post';
import WebLayout from '@/layout/web';
import Head from '@/layout/web/head';
import me from '@api/me';
import { CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Profile from './profile/[username]';

const useStyles = makeStyles((theme) => ({
   
}));

const Me = props => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        me().then(payload => {
            setUser(payload);
        })

    }, [])

    return (
        <>
            <Head title='Thông tin cá nhân' />
            
            {user ? <Profile user={user} /> : <WebLayout> <CircularProgress /> </WebLayout>}
        </>
    )
}

export default Me;