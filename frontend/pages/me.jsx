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
import { havedLogin } from '@/helper/account'
import router from 'next/router';
import { API_URL, SITE_URL } from '@/config';
import { useSnackbar } from 'notistack';
import { getMetaAccount } from '@/helper/account';

const useStyles = makeStyles((theme) => ({

}));

const Me = props => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!havedLogin()) {
            enqueueSnackbar("Vui lòng đăng nhập để xem profile");
            router.push(`${SITE_URL}`)
            return;
        }
        me().then(payload => {
            setUser(payload);

        }).catch(console.log)
    }, [])

    return (
        <>
            <Head title='Thông tin cá nhân' />

            {user ? <Profile user={user} usernameLoggedIn={getMetaAccount().username} /> : <WebLayout> <CircularProgress /> </WebLayout>}
        </>
    )
}

export default Me;