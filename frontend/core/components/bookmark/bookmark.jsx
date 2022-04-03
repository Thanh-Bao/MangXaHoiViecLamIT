import React, { useState, useEffect } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getMetaAccount } from "@/helper/account";
import { savePost, unSavePost } from '@api/post';
import { useSelector } from 'react-redux';

const BookmarkPost = ({ _id, userSave, isShowNumberLeft }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [arrayUserSave, setArrayUserSave] = useState(userSave);
    const [havedSave, setHavedSave] = useState(false);
    const { havedLogin } = useSelector(state => state.posts);

    useEffect(() => {
        setHavedSave(checkHavedSave());
    }, [])

    useEffect(() => {
        setHavedSave(checkHavedSave());
    }, [arrayUserSave, havedLogin]);

    function checkHavedSave() {
        const userId = getMetaAccount() ? getMetaAccount()._id : null;
        return (userId && arrayUserSave && arrayUserSave.length ? arrayUserSave.includes(userId) : false);
    }

    const savePostAction = () => {
        if (havedLogin === false) {
            enqueueSnackbar("Bạn cần đăng nhập để lưu bài viết này!")
            return;
        }
        if (havedSave) {
            unSavePost(_id).then(arrayUserSaved => {
                if (arrayUserSaved.length >= 0) {
                    setArrayUserSave(arrayUserSaved);
                }
            });
        } else {
            savePost(_id).then(arrayUserSaved => {
                if (arrayUserSaved.length > 0) {
                    setArrayUserSave(arrayUserSaved);
                }
            });
        }
    }

    return (
        <>
            {isShowNumberLeft && (arrayUserSave && arrayUserSave.length > 0 ? arrayUserSave.length : null)}
            <IconButton component="span" size='small' onClick={savePostAction}>
                <Tooltip title={havedSave ? "Lưu lại" : "Bỏ lưu"} aria-label="share">
                    {havedSave ? <Bookmark color='inherit' /> : <BookmarkBorder color='inherit' />}
                </Tooltip>
            </IconButton>
            {isShowNumberLeft ? null : (arrayUserSave && arrayUserSave.length > 0 ? arrayUserSave.length : null)}
        </>
    );
}
export default BookmarkPost;