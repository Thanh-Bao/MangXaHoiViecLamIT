import { API_URL } from '@/config';
import { commentPost } from '@api/post';
import { Send } from '@mui/icons-material';
import { Avatar, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import UserPortalCard from './portalCard';

const useStyles = makeStyles((theme) => ({
    wrapperAvatar: {
        flex: 0,
        paddingRight: '16px'
    },
    avatar: {
        ...theme.user.card.avatar,        
    },
    wrapperInput: {
        flex: 1,
        fontSize: theme.comment.content.fontSize,
    },
    wrapper: {
        marginBottom:  theme.comment.content.paddingBottom,
        width: '100%'
    },
    input: {
        width: '100%',
    },
    sendingComment: {
        padding: '4px'
    }
}));

const UserCommentWriting = ({ user, post }) => {
    const classes = useStyles();
    const [commentContent, setCommentContent] = useState('');

    const handleCreateComment = () => {
        commentPost(post._id, {
            content: commentContent
        }).then(payload => {

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Grid container alignItems="flex-end" className={classes.wrapper} >
            <Grid item className={classes.wrapperAvatar} >
                <Avatar className={classes.avatar} alt={user.name} src={`${API_URL}${user.avatar.url}`}  />
            </Grid>
            <Grid item className={classes.wrapperInput}>
                <TextField 
                    id="input-with-icon-grid" 
                    className={classes.input} 
                    label="Viết bình luận"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                                handleCreateComment()
                            }
                        }
                    }
                    onChange={e => { setCommentContent(e.target.value)}}
                    InputProps={{
                        endAdornment: <InputAdornment position='end' >
                            <IconButton className={classes.sendingComment} aria-label="send comment"> <Send fontSize='small' /> </IconButton>
                        </InputAdornment>
                    }}
                />
            </Grid>
        </Grid>
    )
};

UserCommentWriting.propTypes = {
    user: UserPortalCard.propTypes.user
}

export default UserCommentWriting;