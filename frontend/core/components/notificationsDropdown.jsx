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
import { readNotification } from '@api/notification'
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
import ListItemIcon from '@mui/material/ListItemIcon';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const widthPanel = 360;

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
    listItem: {
        '&:hover': {
            backgroundColor: 'rgba(169, 167, 167, 0.16)',
        },
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: "#dbd7d7"
    },
    dotCircle: {
        height: '12px',
        width: '12px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        marginLeft: "15px"
    },
    content: {
        width: '72%'
    },
    username: {
        display: 'inline',
        marginRight: '2px',
        fontWeight: "900",
    },
    actionName: {
        display: 'inline',
        marginRight: '2px'
    },
    optionBtn: {
        width: '40px',
        height: '40px'
    },
    optionList: {
        position: "relative"
    },
    panelOption: {
        position: 'absolute',
        width: "250px",
        zIndex: 99999,
        right: 0,
        borderRadius: '5px',
        border: '1px solid #4f4e4d'
    },
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

    const [havedRead, setHavedRead] = useState(isRead);
    const [isShowOptionBtn, setShowOptionBtn] = useState(false);
    const [isShowOptionList, setShowOptionList] = useState(false);

    const handleReadNotification = (id, isRedirect) => {
        readNotification(id)
            .then(() => {
                setHavedRead(true);
                if (isRedirect) {
                    router.push(`${SITE_URL}/post/${destination.object._id}`);
                }
            })
            .catch(() => {
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
                style={{ color: havedRead ? "#dbd7d7" : "#ffffff" }}
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
                    style={{ display: havedRead ? "none" : (isShowOptionBtn ? "none" : "block") }}
                >
                </Typography>
                <Typography
                    style={{ display: havedRead ? "none" : (isShowOptionBtn ? "block" : "none") }}
                    className={classes.optionList}
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
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={event => { event.stopPropagation(); handleReadNotification(_id, false) }}>
                                        <ListItemIcon>
                                            <DoneOutlineRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Đánh dấu là đã đọc" />
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

    const [isShowPanel, setShowPanel] = useState(false);
    const [notifications, setNotifications] = useState([]);

    let socketInstance;

    useEffect(() => {
        if (havedLogin()) {
            const { _id: userId } = getMetaAccount();
            getNotifications(userId).then(payload => {

                setNotifications(payload);
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
            setNotifications(_.concat([event.notification], notifications));
        });
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
                <List sx={{ width: '100%', maxWidth: widthPanel, bgcolor: 'background.paper', borderRadius: '5px' }}>
                    <Scrollbars style={{ height: '500px', width: '100%' }}>
                        {notifications.map(notify =>
                            <NotifiyItem notify={notify} />)}
                    </Scrollbars>
                </List>
            </Box>
        </Typography>
    )
}

export default NotificationsPopup;
