
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
            onClick={() => { handleClickPhoto(item) }}
            src={src}
            // srcSet={`${API_URL}${item.url}`}
            alt={item.title}
            onError={() => setSrc(`${API_URL}/default/imageholder/404.jpg`)}
        />
    )
}

export default ImageLoader;