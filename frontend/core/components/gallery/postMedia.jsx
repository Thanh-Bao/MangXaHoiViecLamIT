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
    const classes = useStyles();
    const { maximage = -1 } = props;
    const media = [...props.media];
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { makeContextualHref, returnHref } = useContextualRouting();

    const [photoSelection, setPhotoSelection] = useState(null);
    const [openPhoto, setOpenPhoto] = useState(false);


    let cols = 2;

    switch (media.length) {
        case 1:
            cols = 1;
            break;
        default:
            break;
    }

    const handleClickPhoto = item => {
        enqueueSnackbar('', {
            content: <CircularProgress sx={{ color: '#e4e6eb' }} />
        });

        getPhoto(item._id).then(payload => {
            closeSnackbar();
            router.push(makeContextualHref({ id: item._id }), '/photo/' + item._id, { shallow: true });

            setPhotoSelection(payload);
            setOpenPhoto(true);
        })
    }

    const handleClose = () => {
        router.push(returnHref, undefined, { shallow: true });

        setOpenPhoto(false);
        setPhotoSelection(null);
    }

    const getNextImage = () => {
        const currentImageIndex = _.findIndex(media, { _id: photoSelection._id });

        if (currentImageIndex < (media.length - 1)) {
            return media[currentImageIndex + 1];
        }
        else {
            return null;
        }
    }

    const getPrevImage = () => {
        const currentImageIndex = _.findIndex(media, { _id: photoSelection._id });

        if (currentImageIndex > 0) {
            return media[currentImageIndex - 1];
        }
        else {
            return null
        }
    }


    const navigateImage = photoSelection == null ? <> </> : <Stack className={classes.wrapperHeader} direction="row" spacing={2}>
        {getNextImage() != null && <NavigateNextIcon
            className={classes.nextImg}
            onClick={() => {
                const nextImage = getNextImage();
                handleClickPhoto(nextImage)
            }}
        />}
        {getPrevImage() != null && <NavigateBeforeIcon
            className={classes.prevImg}
            onClick={() => { const prevImage = getPrevImage(); handleClickPhoto(prevImage) }}
        />}
    </Stack>;

    const image = item => <ImageLoader item={item} handleClickPhoto={handleClickPhoto} />

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

            <Dialog
                open={openPhoto}
                onClose={handleClose}
                fullWidth={true}
                maxWidth='xl'
                className={classes.dialog}
                PaperProps={{
                    className: classes.rootDialog
                }}
            >
                {photoSelection && <MediaPhotoPage onCloseImgDialog={handleClose} header={false} photo={photoSelection} navigateImage={navigateImage} />}
            </Dialog>
        </>
    );
}

export default GalleryPostMedia;