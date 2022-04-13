import PostUserCard from '@/components/post/userCard';
import { SITE_URL, API_URL } from '@/config';
import WebLayout from '@/layout/web';
import Head from '@/layout/web/head';
import { getPhoto } from '@api/media';
import { Grid } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'material-ui-image';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.primary.bgColor,
        color: theme.typography.body2.color
    },
    wrapperHeader: {
        padding: '12px'
    },
    imageWrapper: {
        backgroundColor: theme.palette.primary.bgColor,
    },
    photoWrapper: {
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
    },
    closeImg: {
        // borderStyle: 'solid',
        position: 'absolute',
        top: '14px',
        right: '14px',
        cursor: 'pointer',
        transform: 'scale(1.2)',
        backgroundColor: '#9e9e9e85',
        borderRadius: '50%'
    },
    mainImage: {
        objectFit: 'contain',
        backgroundColor: 'rgb(0 0 0)',
        '&:image': {
            width: "auto",
            height: "100%",
            left: '50%',
            transform: 'translate(-50%, 0)'
        }
    }
}));

const MediaPhotoPage = (props) => {
    const classes = useStyles();

    const { photo, header = true } = props;

    return (
        <>
            <Head
                title={`${photo.user.username} - Ảnh `}
            />
            <WebLayout header={header}>
                <Stack className={classes.wrapper} >
                    <Grid
                        container
                        className={classes.wrapper}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs="auto">
                            <PostUserCard postLink='photo' post={photo} user={photo.user} />
                        </Grid>
                        <Grid item xs="auto">

                            {/* ///////////// */}
                            {/* ///////////// */}
                            {/* ///////////// */}
                        </Grid>
                    </Grid>
                    <Box className={classes.photoWrapper}>
                        <Image
                            style={{
                                objectFit: 'contain',
                                backgroundColor: 'rgb(0 0 0)',
                            }}
                            imageStyle={{
                                width: "auto",
                                maxWidth: "100%",
                                height: "auto",
                                left: '50%',
                                transform: 'translate(-50%, 0)'
                            }} src={`${API_URL}${photo.url}`} />

                        {header == false &&
                            <HighlightOffOutlinedIcon
                                className={classes.closeImg}
                                onClick={() => props.onCloseImgDialog()}
                            />
                        }
                        {props.navigateImage}
                    </Box>
                </Stack>
            </WebLayout>
        </>
    );
}

MediaPhotoPage.getInitialProps = async (ctx) => {
    const { slug } = ctx.query;

    const photo = await getPhoto(slug);

    return { photo };
}

export default MediaPhotoPage;