import { CircularProgress, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    dialog: {
        alignItems: 'baseline'
    },
}));

const PostCreateLoading = (props, ref) => {
    const styles = useStyles();

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            handleOpen();
        },
        close: () => {
            handleClose();
        }
    }));

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false) }
    
    return (
        <Modal open={open} onClose={handleClose} classes={{ container: styles.dialog }}>
            <CircularProgress />
        </Modal>
    )
}

export default forwardRef(PostCreateLoading);