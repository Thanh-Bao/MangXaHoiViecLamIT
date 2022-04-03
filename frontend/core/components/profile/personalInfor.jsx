import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { API_URL } from '@/config';
import moment from 'moment-timezone';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Tooltip from '@mui/material/Tooltip';
import { unfollow, follow } from "@/api/user";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 150,
        height: 'auto',
        justifyContent: "center",
        margin: "auto"
    },
    blurText: {
        color: "#9ea0a3"
    },
    count: {
        fontSize: '22px',
        fontWeight: 900
    },
    btnFollow: {
        backgroundColor: "white",
        color: "black",
        textTransform: 'lowercase',
        padding: '8px 40px',
        marginTop: '10px',
        '&:hover': {
            backgroundColor: "#bfbfbf",
        }
    },
    followIcon: {
        position: "relative",
        top: "2px",
    }
}))

const Statistics = ({ count, label }) => {
    const classes = useStyles();
    return (
        <Stack alignItems="center">
            <Typography className={classes.count} >
                {count}
            </Typography>
            <Typography className={classes.blurText} >
                {label}
            </Typography>
        </Stack>
    )
}

const PersonalInfor = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { user, isViewMyProfilePage, userIdLoggedIn } = props;
    console.log(props)
    const [followStatus, setFollowStatus] = useState(user.follower.includes(userIdLoggedIn));

    const handleFollow = () => {
        follow(user._id)
            .then((res) => { console.log(res), setFollowStatus(true) })
            .catch(() => enqueueSnackbar(`Lỗi follow ${user.username}, vui lòng thử lại`))
    }

    const handleUnfollow = () => {
        unfollow(user._id)
            .then((res) => { console.log(res), setFollowStatus(false) })
            .catch(() => enqueueSnackbar(`Lỗi unfollow ${user.username}, vui lòng thử lại`))
    }

    return (
        <>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar
                    className={classes.avatar}
                    alt={`${user.username}`}
                    src={`${API_URL}${user.avatar}`}
                />
                <Typography
                    variant="h4"
                    fontWeight={900}
                    component="div">
                    {user.username}
                </Typography>
                <Typography className={classes.blurText}
                    component="div">
                    Tham gia từ {moment(user.createdAt).format('DD-MM-YYYY')}
                </Typography>
                <Stack direction="row" spacing={5}>
                    <Statistics count={user.following.length} label="Đang theo dõi" />
                    <Statistics count={user.follower.length} label="Người theo dõi" />
                    <Statistics count={0} label="Like" />
                </Stack>

                {!isViewMyProfilePage && (
                    followStatus ?
                        <Tooltip title="Hủy theo dõi" placement="bottom">
                            <Button
                                onClick={handleUnfollow}
                                className={classes.btnFollow}
                                variant="outlined" >
                                <Stack direction="row" spacing={1}>
                                    <DoneRoundedIcon className={classes.followIcon} />
                                    <Typography sx={{ fontSize: 19 }} component="span">
                                        Đang theo dõi
                                    </Typography>
                                </Stack>
                            </Button>
                        </Tooltip>
                        :
                        <Button
                            onClick={handleFollow}
                            className={classes.btnFollow}
                            variant="contained" >
                            <Stack direction="row" spacing={1}>
                                <NotificationsNoneIcon className={classes.followIcon} />
                                <Typography sx={{ fontSize: 19 }} component="span">
                                    Theo dõi
                                </Typography>
                            </Stack>
                        </Button>
                )}
            </Stack>
        </>
    )
}

export default PersonalInfor
