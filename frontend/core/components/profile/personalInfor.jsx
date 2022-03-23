import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { API_URL } from '@/config';
import moment from 'moment-timezone';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles(theme => ({

}))

const PersonalInfor = (props) => {
    const classes = useStyles();
    const { user } = props;

    return (
        <>
            <Stack spacing={2}>
                <Avatar
                    alt="Ảnh đại diện"
                    src={`${API_URL}${user.avatar}`}
                    sx={{ width: 200, height: 'auto', justifyContent: "center", mx: "auto" }}
                />
                <Typography
                    variant="h3"
                    align="center"
                    color="background.default"
                    fontWeight={900}
                    component="div">
                    {user.username}
                </Typography>
                <Typography variant="string"
                    color="background.default"
                    align="center"
                    component="div">
                    Tham gia từ {moment(user.createdAt).format('DD-MM-YYYY')}
                </Typography>
            </Stack>
        </>
    )
}

export default PersonalInfor
