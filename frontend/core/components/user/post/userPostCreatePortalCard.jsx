import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CardHeader, ToggleButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import UserAvatar from '../userAvatar';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 700,
        color: 'black'
    },
    wrapper: {
        padding: '0px',
    },
    rootAnonymous: {
        fontSize: '0.6rem',
        padding: '2px 7px'
    },
    iconAnonymous: {
        width: '0.75rem',
        height: '0.75rem',
    }
}));

const UserPostCreatePortalCard = ({ user, cardProps = {} }, ref) => {
    const classes = useStyles();
    const [isAnonymous, setAnonymous] = useState(false);

    useImperativeHandle(ref, () => ({
        anonymous: () => {
            return isAnonymous; 
        }
    }));

    return (
        <CardHeader
            avatar={                               
                <UserAvatar user={user} />
            }
            title={
                <> 
                    {user.username}

                    <br/>

                    <ToggleButton size='small' classes={{ root: classes.rootAnonymous }} value={isAnonymous} selected={isAnonymous} onChange={() => { setAnonymous(!isAnonymous); }} >
                        {isAnonymous ? <> <VisibilityOff  classes={{ root: classes.iconAnonymous }} /> &nbsp; Option 1 </> : <> <Visibility classes={{ root: classes.iconAnonymous }}  /> &nbsp; Option 2 </> }
                    </ToggleButton>
                </>
            }
            
            className={classes.wrapper}
            {...cardProps}
            classes={{
                ...cardProps.classes,
                title: classes.title
            }}
        />
    )
}
export default forwardRef(UserPostCreatePortalCard); 