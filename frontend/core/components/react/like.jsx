import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getMetaAccount, havedLogin } from "@/helper/account";
import { reactPost, unReactPost } from '@api/post';

const ReactPost = ({ _id, react }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [arrayReact, setArrayReact] = useState(react);
    const [_havedLogin, setHavedLogin] = useState(null);
    const [havedLike, setHavedLike] = useState(false);

    useEffect(() => {
        setHavedLogin(Boolean(havedLogin()));
        setHavedLike(checkHavedLike());
    }, []) // do post/[slug].jsx là SSR nên phải getLocalStogare kiểu này, không checkLogin lúc init state được

    useEffect(() => {
        setHavedLike(checkHavedLike());
    }, [arrayReact]);

    function checkHavedLike() {
        const userId = getMetaAccount() ? getMetaAccount()._id : null;
        return (userId && arrayReact && arrayReact.length ? arrayReact.some(item => item.user === userId) : false);
    }

    const reactAction = () => {
        if (_havedLogin === false) {
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
                {havedLike ? <Favorite color='inherit' /> : <FavoriteBorder color='inherit' />}
            </IconButton>   {arrayReact && arrayReact.length > 0 ? arrayReact.length : null}
        </>
    )
}

export default ReactPost;