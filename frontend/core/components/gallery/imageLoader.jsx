
import React, { useState } from 'react';
import { API_URL } from '@/config';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    showPointer: { cursor: 'pointer' },
}));

const ImageLoader = ({ item, handleClickPhoto }) => {
    const classes = useStyles();

    const [src, setSrc] = useState(`${API_URL}${item.url}`);

    return (
        <img
            className={classes.showPointer}
            width="100%"
            height="auto"
            src={src}
            alt={item.title}
            onError={() => setSrc(`${API_URL}/static/404.jpg`)}
        />
    )
}

export default ImageLoader;