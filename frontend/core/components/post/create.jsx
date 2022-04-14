import { API_URL } from '@/config';
import { upload } from '@api/media';
import { createPost } from '@api/post';
import { PhotoLibrarySharp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, ImageList, ImageListItem, Input, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ContentState, Editor, EditorState } from 'draft-js';
import "draft-js/dist/Draft.css";
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import UserPostCreatePortalCard from '../user/post/userPostCreatePortalCard';
import PostCreateLoading from './create/loading';

import { useDispatch } from 'react-redux';
import { addPost } from '@/reduxTookit/slices/postsIndexSlice'
import { postMapper } from '@/helper/mapper';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    titleCreatePost: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textEditor: {
        minHeight: "6em",
        cursor: "text",
        width: '500px',
    },
    dialog: {
        alignItems: 'baseline'
    },
    actionPost: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        margin: '10px 0',
        padding: '7px 0',
        borderRadius: '4px'
    },
    uploadPost: {
        width: '100%',
        background: '#000000',
        color: 'white'
    },
    disabledUploadPost: {
        background: '#d6d6d6'
    },
    uploadMedia: {
        display: 'none'
    },
    buttonUpload: {
        '&:hover': {
            background: '#3d3d3d'
        }
    }
}));

const PostCreate = (props, ref) => {
    const styles = useStyles();
    const { me, afterLogin = () => { } } = props;

    const [open, setOpen] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [handlingRequest, setHandlingRequest] = useState(false);
    const [fileUploads, setFileUploads] = useState([]);
    const [fileLoadings, setFileLoadings] = useState([]);

    const editorRef = useRef(null);
    const userCard = useRef(null);
    const loadingModal = useRef(null);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        open: () => {
            handleOpen();
        }
    }));

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false) }
    const focusEditor = () => { editorRef.current.focus(); }

    const uploadFiles = event => {
        const files = event.target.files;
        const filesName = _.map(Array.from(files), item => item.name);

        setFileLoadings([...fileLoadings, filesName]);

        const fileHaveUploaded = _.map(Array.from(files), file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('media', file, file.name);

                upload(formData).then(mediaDoc => {
                    setFileLoadings(_.filter(fileLoadings, item => item != file.name));
                    resolve(mediaDoc);
                }).catch(error => {
                    reject(error)
                });
            })
        });

        Promise.all(fileHaveUploaded).then(mediaDocs => {
            setFileUploads(_.concat(mediaDocs, fileUploads));
        }).catch(error => { })
    }

    const uploadPost = event => {
        setHandlingRequest(true);
        loadingModal.current.open();

        const mediaId = fileUploads.map(item => ({ link: item }));

        const params = {
            description: editorState.getCurrentContent().getPlainText(),
            images: mediaId,
        }
        createPost(params).then(post => {
            setEditorState(EditorState.push(editorState, ContentState.createFromText('')));
            setFileUploads([]);
            handleClose();
            const data = postMapper(post);
            dispatch(addPost(data))
        }).finally(() => {
            setHandlingRequest(false);
            loadingModal.current.close();
        })
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} classes={{ container: styles.dialog }}>
                <DialogTitle className={styles.titleCreatePost}> Đăng bài </DialogTitle>
                <DialogContent dividers>
                    <UserPostCreatePortalCard ref={userCard} user={me} />

                    <br />

                    <div className={styles.textEditor} onClick={focusEditor}>
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="Nội dung vài biết"
                        />
                    </div>

                    {(fileUploads.length > 0 || fileLoadings.length > 0) &&
                        <Scrollbars className={styles.wrapper} style={{ height: '225px', width: '100%' }} universal={true}>

                            <ImageList variant="masonry" cols={2} gap={8}>
                                {fileUploads.map(item => (


                                    <ImageListItem key={item}>
                                         <img
                                            src={`${API_URL}/images/${item}`}
                                            srcSet={`${API_URL}/images/${item}`}
                                            alt={item}
                                        />
                                    </ImageListItem>
                                ))}

                                {fileLoadings.map((item, key) => (
                                    <ImageListItem key={key}>
                                        <Box component="span" sx={{ height: '30px', }}>
                                            <CircularProgress />
                                        </Box>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Scrollbars>
                    }

                    <div className={styles.actionPost} >
                        <Tooltip title='thêm hình ảnh'>
                            <label htmlFor="icon-button-file">
                                <Input id="icon-button-file" inputProps={{ multiple: true, accept: "image/*,video/*" }} type="file" className={styles.uploadMedia} onChange={uploadFiles} />

                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoLibrarySharp />
                                </IconButton>
                            </label>
                        </Tooltip>
                        <Typography variant="button">
                            Thêm hình ảnh
                        </Typography>
                    </div>

                    <div>
                        <LoadingButton
                            onClick={uploadPost}
                            color="primary"
                            disabled={(!(editorState.getCurrentContent().hasText() && editorState.getCurrentContent().getPlainText().length > 0) || fileUploads.length == 0 || fileLoadings > 0 || handlingRequest == true)}
                            loadingPosition="start"
                            loading={handlingRequest}
                            className={styles.buttonUpload}
                            classes={{
                                root: styles.uploadPost,
                                disabled: styles.disabledUploadPost
                            }}>
                            Đăng bài
                        </LoadingButton>
                    </div>
                </DialogContent>
            </Dialog>

            <PostCreateLoading ref={loadingModal} />
        </>
    )
}

export default forwardRef(PostCreate);
