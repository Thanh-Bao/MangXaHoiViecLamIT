import { Notifications } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Badge, IconButton } from '@mui/material';
import styles from '@styles/header.module.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import { getNotifications } from '@api/user';
import { readNotification, readAllNotification } from '@api/notification'
import { getMetaAccount, havedLogin } from "@/helper/account";
import { API_URL, SITE_URL } from '@/config';
import { timeDifference } from '@/helper/dateFormat';
import _ from 'lodash';
import env from '../../env.json';
import { io } from "socket.io-client";
import router from 'next/router';
import { useSnackbar } from 'notistack';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markReadItem, markAllNotifAsRead, appendNotif } from '@/reduxTookit/slices/notificationsSlice'

const widthPanel = 360;
const readColor = {
    read: "#919090",
    unread: "#ffffff",
}

const useStyles = makeStyles((theme) => ({
    parent: {
        position: 'relative',
    },
    panel: {
        position: 'absolute',
        right: 0,
        top: 52,
        width: widthPanel,
        maxHeight: 400,
    },
    list: {
        width: '100%',
        maxWidth: widthPanel,
        borderRadius: '5px',
        border: '1px solid #4f4e4d',
    },
    listItem: {
        '&:hover': {
            backgroundColor: 'rgba(169, 167, 167, 0.16)',
        },
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: "#dbd7d7",
    },
    dotCircle: {
        height: '12px',
        width: '12px',
        backgroundColor: '#ffffff',
        backgroundClip: 'content-box',
        borderRadius: '50%',
        marginLeft: "15px",
        boxSizing: "content-box",
        padding: "6px",
    },
    content: {
        width: '72%',
    },
    username: {
        display: 'inline',
        marginRight: '2px',
        fontWeight: "900",
    },
    actionName: {
        display: 'inline',
        marginRight: '2px',
    },
    optionBtn: {
        width: '40px',
        height: '40px',
    },
    optionList: {
        position: "relative",
    },
    panelOption: {
        maxWidth: 360,
        position: 'absolute',
        width: "250px",
        zIndex: 99999,
        right: 0,
        borderRadius: '5px',
        border: '1px solid #4f4e4d',
    },
    markAllAsRead: {
        display: 'flex',
        justifyContent: "center",
        marginTop: "10px",
    },
    hiddenMarkAllAsRead: {
        display: 'none'
    },
    btnMarkAllAsRead: {
        textTransform: 'lowercase',
        color: 'white'
    },
    emtyMessage: {
        display: 'flex',
        marginTop: '50px',
        justifyContent: "center",
        alignItems: "center",
    }
}));

const getActionLable = type => {
    switch (type) {
        case "like.post":
            return "thích bài viết"
        case "comment.post":
            return "bình luận bài viết"
        default:
            return type
    }
}

const NotifiyItem = ({ notify }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { _id, source, destination, type, createdAt, isRead } = notify;

    const [isShowOptionBtn, setShowOptionBtn] = useState(false);
    const [isShowOptionList, setShowOptionList] = useState(false);

    const dispatch = useDispatch();

    const handleReadNotification = (id, isRedirect) => {
        readNotification(id)
            .then(() => {
                dispatch(markReadItem(id));
                if (isRedirect) {
                    dispatch(markReadItem(id));
                    router.push(`${SITE_URL}/post/${destination.object._id}`);
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Lỗi đọc thông báo, vui lòng thử lại sau")
            })
    }


    const handleMouseEnterItem = () => {
        setShowOptionBtn(true);
    }

    const handleMouseLeaveItem = () => {
        setShowOptionBtn(false);
    }

    return (
        <>
            <ListItem
                className={classes.listItem}
                key={_id}
                alignItems="flex-start"
                style={{ color: isRead ? readColor.read : readColor.unread }}
                onClick={() => handleReadNotification(_id, true)}
                onMouseEnter={() => handleMouseEnterItem()}
                onMouseLeave={() => handleMouseLeaveItem()}
            >
                <ListItemAvatar>
                    <Avatar alt={source.username} src={`${API_URL}${source.object.avatar}`} />
                </ListItemAvatar>
                <Typography className={classes.content} component="div">
                    <Typography
                        className={classes.username}
                        component="span"
                    >
                        {source.object.username}
                    </Typography>
                    <Typography
                        className={classes.actionName}
                        component="span"
                    >
                        đã {getActionLable(type)} "{destination.object.content.length > 30 ? destination.object.content.substring(0, 30) + '...' : destination.object.content}" của bạn
                    </Typography>
                    <ListItemText
                        primary={timeDifference(createdAt)}
                    />
                </Typography>
                <Typography
                    className={classes.dotCircle}
                    component="div"
                    style={{ display: isRead ? "none" : (isShowOptionBtn ? "none" : "block") }}
                >
                </Typography>
                <Typography
                    className={classes.optionList}
                    style={{ display: isRead ? "none" : (isShowOptionBtn ? "block" : "none") }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="MoreOption"
                        className={`${styles.baseButton} ${classes.optionBtn}`}
                    >
                        <MoreHorizOutlinedIcon onClick={event => { event.stopPropagation(); setShowOptionList(!isShowOptionList) }} />
                    </IconButton>
                    {isShowOptionList && (
                        <Box
                            className={classes.panelOption}
                            sx={{ bgcolor: 'background.paper' }}
                        >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={event => { event.stopPropagation(); handleReadNotification(_id, false) }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-start"
                                            spacing={1}>
                                            <DoneOutlineRoundedIcon />
                                            <ListItemText primary="Đánh dấu là đã đọc" />
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>)}
                </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}

const NotificationsPopup = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [isShowPanel, setShowPanel] = useState(false);
    const { notifications } = useSelector(state => state);
    const dispatch = useDispatch();

    let socketInstance;

    useEffect(() => {
        if (havedLogin()) {
            const { _id: userId } = getMetaAccount();
            getNotifications(userId).then(payload => {

                dispatch(fetchNotifications(payload))
                if (socketInstance === undefined) {
                    socketInstance = io(env.GATEWAY_URL);

                    socketInstance.on('connect', () => { });

                    listenNotify();
                }
            });
        }
    }, []);

    const listenNotify = () => {
        socketInstance.on('notify', event => {
            const { _id: userId } = getMetaAccount();
            if (userId != event.notification.source.object._id) {
                dispatch(appendNotif(event.notification))
            }
        });
    }

    const handleReadAllNotification = () => {
        readAllNotification()
            .then(() => {
                dispatch(markAllNotifAsRead());
            })
            .catch((err) => { enqueueSnackbar("Lỗi, vui lòng thử lại") })
    }

    return (
        <Typography className={classes.parent}>
            <IconButton
                color="inherit"
                aria-label="Notification"
                className={styles.baseButton}
            >
                <Badge
                    badgeContent={notifications.filter(notify => !notify.isRead).length}
                    color="primary"
                >
                    <Notifications onClick={() => setShowPanel(!isShowPanel)} />
                </Badge>
            </IconButton>
            <Box className={classes.panel} style={{ display: isShowPanel ? 'inline-block' : 'none' }}>
                <List
                    sx={{ bgcolor: 'background.paper' }}
                    className={classes.list}
                >
                    <Scrollbars style={{ height: '500px', width: '100%' }}>
                        {notifications.length > 0 ?
                            notifications.map(notify =>
                                <NotifiyItem notify={notify} />)
                            : <Typography
                                className={classes.emtyMessage}
                                component="span">
                                Hiện tại chưa có thông báo!
                            </Typography>
                        }
                    </Scrollbars>
                    <Typography
                        style={notifications.some(notif => notif.isRead == false) ?
                            {
                                display: 'flex',
                                justifyContent: "center",
                                marginTop: "10px"
                            } :
                            { display: 'none' }
                        }
                        component="div">
                        <Button
                            onClick={handleReadAllNotification}
                            className={classes.btnMarkAllAsRead}
                            variant="text">
                            <Stack
                                direction="row"
                                spacing={1}>
                                <DoneAllRoundedIcon />
                                <Typography
                                    component="span">
                                    Đánh dấu tất cả là đã đọc
                                </Typography>
                            </Stack>
                        </Button>
                    </Typography>
                </List>
            </Box>
        </Typography >
    )
}

export default NotificationsPopup;
