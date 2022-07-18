import me from '@/api/me';
import PostCreate from '@/components/post/create';
import { AccountCircle, AddToPhotos, ArrowDropDown, Home, Menu, Message, MoreVert, Notifications, Telegram, TrendingUp } from '@mui/icons-material';
import { AppBar, Avatar, Badge, BottomNavigation, BottomNavigationAction, Button, Chip, Grid, IconButton, Stack, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL, MOBILE_WIDTH_MAXIMUM, PAGE_TAB } from '@/config';
import styles from '@styles/header.module.scss';
import Login from './login';
import RightMenuHeader from './menu';
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none',
        backgroundColor: '#4267B2',
        borderBottom: '1px solid #383838'
    },
    toolbarHeader: {
        minHeight: '52px'
    },

}))

const Header = props => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const menuRight = useRef();
    const loginForm = useRef();
    const postForm = useRef();

    const [screenWidth, setScreenWidth] = useState(1024);
    const [meInformation, setMeInformation] = useState(null);
    const [pageTab, setPageTab] = useState(PAGE_TAB.HOME);

    const handleMenu = event => {
        if (menuRight.current) {
            if (open) {
                menuRight.current.open(event);
            }
        }
    }

    const openPostForm = () => {
        if (postForm.current) {
            postForm.current.open();
        }
    }

    const openLoginForm = () => {
        if (loginForm.current) {
            loginForm.current.open();
        }
    }

    const requestMeInformation = () => {
        me().then(payload => {
            setMeInformation(payload);
        });
    }

    const handleChangePageTab = (event, value) => {
        if (value != PAGE_TAB.HOME) {
            enqueueSnackbar('Cảm ơn các bạn đã đợi chờ, chúng tôi hiện đang cập nhật tính năng này...');
        }
    }

    useEffect(() => {
        requestMeInformation();

        if (typeof window !== "undefined") {
            setScreenWidth(window.innerWidth)
        }

    }, [null])

    return (
        <>
            {MOBILE_WIDTH_MAXIMUM < screenWidth &&
                <AppBar position="fixed" key='appbar-desktop' className={classes.appBar}>
                    <Toolbar className={classes.toolbarHeader}>
                        <Link href={`/`}>
                            <a>
                                {/* <Image layout='fill' src="/logo.png" alt="logo" className={styles.logo} /> */}
                            </a>
                        </Link>


                        <div className={styles.grow} />

                        {meInformation &&
                            <Stack spacing={1} direction='row' justifyContent='center' alignContent='center'>
                                <Chip
                                    component="a"
                                    href='/me'
                                    className={styles.meInfo}
                                    avatar={<Avatar alt={meInformation.username}
                                        src={`${API_URL}/static/avatar.png`} />}
                                    label={meInformation.username}
                                />

                                <Button className={styles.buttonCreatePost} edge="end" startIcon={<AddToPhotos fontSize='small' />} size='medium' onClick={openPostForm} >
                                    Đăng bài
                                </Button>

                                <IconButton
                                    color="inherit"
                                    aria-label="more"
                                    onClick={(event) => { handleMenu(event) }}
                                    className={styles.baseButton}
                                >
                                    <ArrowDropDown />
                                </IconButton>
                            </Stack>
                        }

                        {meInformation == null && <Button className={styles.buttonCreatePost} edge="end" variant="outlined" startIcon={<AccountCircle />} size='medium' onClick={openLoginForm} > Đăng nhập </Button>}

                    </Toolbar>

                </AppBar>
            }

            {MOBILE_WIDTH_MAXIMUM >= screenWidth &&
                <>
                    <AppBar position="fixed" key='appbar-mobile-top' className={classes.appBar}>
                        <Toolbar className={classes.toolbarHeader}>
                            <Link href={`/`}>
                                <a>
                                    <Image layout='fill' src="/logo.png" alt="logo" className={styles.logo} />
                                </a>
                            </Link>

                            <div className={styles.grow} />

                            {meInformation == null && <Button className={styles.buttonLogin} edge="end" variant="outlined" startIcon={<AccountCircle />} size='medium' onClick={openLoginForm} > Đăng nhập </Button>}

                            {meInformation != null &&
                                <>
                                    <IconButton className={styles.baseButton} component="span" onClick={openPostForm} ><AddToPhotos /> </IconButton>

                                    <Chip
                                        onClick={(event) => { handleMenu(event) }}
                                        className={styles.meInfo}
                                        avatar={<Avatar alt={meInformation.username}
                                            src={`${API_URL}/static/avatar.png`} />}
                                        label={meInformation.username}
                                    />
                                </>
                            }
                        </Toolbar>
                    </AppBar>

                    <AppBar position="fixed" key='appbar-mobile-bottom' className={classes.appBar} sx={{ top: 'auto', bottom: 0 }}>
                        {
                            meInformation != null
                                ?
                                <BottomNavigation
                                    showLabels
                                    value={pageTab}
                                    onChange={handleChangePageTab}
                                >
                                    <BottomNavigationAction value={PAGE_TAB.HOME.value} label="Trang chủ" icon={<Home />} />
                                    <BottomNavigationAction value={PAGE_TAB.TRENDING.value} label="Thịnh hành" icon={<TrendingUp />} />
                                    <BottomNavigationAction value={PAGE_TAB.INBOX.value} label="Tin nhắn" icon={<Telegram />} />
                                    <BottomNavigationAction value={PAGE_TAB.NOTIFICATION.value} label="Thông báo" icon={<Notifications />} />
                                </BottomNavigation>
                                :
                                <BottomNavigation
                                    showLabels
                                    value={pageTab}
                                    onChange={handleChangePageTab}
                                >
                                    <BottomNavigationAction value={PAGE_TAB.HOME.value} label="Trang chủ" icon={<Home />} />
                                    <BottomNavigationAction value={PAGE_TAB.TRENDING.value} label="Thịnh hành" icon={<TrendingUp />} />
                                </BottomNavigation>
                        }
                    </AppBar>
                </>
            }

            {
                meInformation != null &&
                <>
                    <RightMenuHeader ref={menuRight} afterLogout={() => { requestMeInformation() }} />
                    <PostCreate me={meInformation} ref={postForm} />
                </>
            }

            {meInformation == null && <Login ref={loginForm} afterLogin={() => { requestMeInformation() }} />}
        </>
    )
}

export default Header;