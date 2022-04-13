import { API_URL } from '@/config';
import { CircularProgress, Dialog, ImageList, ImageListItem, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import React, { useState } from 'react';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useRouter } from 'next/router';
import MediaPhotoPage from '@/pages/photo/[slug]';
import { getPhoto } from '@api/media';
import { useSnackbar } from 'notistack';
import router from 'next/router';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import ImageLoader from './imageLoader';

const useStyles = makeStyles((theme) => ({
    dialog: {
        alignItems: 'baseline',
        minHeight: '100vh',
    },
    rootDialog: {
        backgroundColor: theme.palette.primary.bgColor,
        marginTop: '52px'
    },
    showPointer: { cursor: 'pointer' },

    nextImg: {
        position: 'absolute',
        right: '1%',
        top: '50%',
        cursor: 'pointer',
        transform: 'translate(0, -50%)',
        backgroundColor: '#9e9e9e85',
    },
    prevImg: {
        position: 'absolute',
        left: '1%',
        top: '50%',
        cursor: 'pointer',
        transform: 'translate(0, -50%)',
        backgroundColor: '#9e9e9e85',
    }
}));

const GalleryPostMedia = (props) => {
    const { maximage = -1 } = props;
    const media = [...props.media];

    let cols = 2;

    switch (media.length) {
        case 1:
            cols = 1;
            break;
        default:
            break;
    }

    const image = item => <ImageLoader item={item} />

    return (
        <>
            <ImageList sx={{ height: '30vh', overflowY: 'hidden' }} variant="quilted" cols={cols} gap={2} {...props}>
                {
                    maximage == -1 ?
                        media.map(item => (
                            <ImageListItem key={item._id}>
                                {image(item)}
                            </ImageListItem>
                        )) :
                        _.slice(media, 0, maximage).map(item => (
                            <ImageListItem
                                key={item._id}>
                                {image(item)}
                            </ImageListItem>
                        ))
                }
            </ImageList>
        </>
    );
}

export default GalleryPostMedia;