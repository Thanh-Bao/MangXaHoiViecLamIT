import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    dot: {
        '&:after': {
            content: '"•"',
            margin: '0 4px'
        }
    }
}));

const DotDivider  = ({ article }) => {
    const classes = useStyles();

    return (
        <span className={classes.dot}></span>
    )
}

export default DotDivider;