import React from 'react'
import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Share, Telegram } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { SITE_URL } from '@/config';

const useStyles = makeStyles((theme) => ({

}));

const SharePost = props => {
    const { post } = props;
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const handleCopy = () => {

        post ? navigator.clipboard.writeText(`${SITE_URL}/post/${post._id}`) : navigator.clipboard.writeText(window.location.href);
        enqueueSnackbar('Đã copy link bài viết');
    }

    return (
        <>
            <IconButton component="span" size='small' onClick={handleCopy}>
                <Tooltip title='Chia sẻ' aria-label="share">
                    < Telegram color='primary' className={classes.pointer} />
                </Tooltip>
            </IconButton>
        </>
    )
}

export default SharePost
