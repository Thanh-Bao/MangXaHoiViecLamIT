import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getMetaAccount } from "@/helper/account";
import { reactPost, unReactPost } from '@api/post';
import { useSelector } from 'react-redux';

const ReactPost = ({ _id, react }) => {
    const { enqueueSnackbar } = useSnackbar();
    
    const [arrayReact, setArrayReact] = useState(react);
    const { havedLogin } = useSelector(state => state.posts);
    const [havedLike, setHavedLike] = useState(false);

    useEffect(() => {
        setHavedLike(checkHavedLike());
    }, [])

    useEffect(() => {
        setHavedLike(checkHavedLike());
    }, [arrayReact, havedLogin]);

    function checkHavedLike() {
        const userId = getMetaAccount() ? getMetaAccount()._id : null;
        return (userId && arrayReact && arrayReact.length ? arrayReact.some(item => item.user === userId) : false);
    }

    const reactAction = () => {
        if (havedLogin === false) {
            enqueueSnackbar("Bạn cần đăng nhập để like!")
            return;
        }
        if (havedLike) {
            unReactPost(_id).then(reacts => {
                if (reacts.length >= 0) {
                    setArrayReact(reacts);
                }
            });
        } else {
            reactPost(_id).then(reacts => {
                if (reacts.length > 0) {
                    setArrayReact(reacts);
                }
            });
        }
    }

    return (
        <>
            <IconButton component="span" size='small' onClick={reactAction}>
                {havedLike ? <Favorite color='primary' /> : <FavoriteBorder color='primary' />}
            </IconButton>   {arrayReact && arrayReact.length > 0 ? arrayReact.length : null}
        </>
    )
}

export default ReactPost;