
import React, { useState } from 'react';
import { API_URL } from '@/config';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    showPointer: { cursor: 'pointer' },
}));

const ImageLoader = ({ item, handleClickPhoto }) => {
    const classes = useStyles();

    const [src, setSrc] = useState(`${API_URL}${item.url}`);

    return (
        <Image
            className={classes.showPointer}
            layout="fill"
            src={src}
            alt={item.title}
            onError={() => setSrc(`${API_URL}/static/404.jpg`)}
        />
    )
}

export default ImageLoader;