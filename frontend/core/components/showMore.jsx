import { makeStyles } from '@mui/styles';
import React from 'react';
import ShowMoreText from "react-show-more-text";

const useStyles = makeStyles((theme) => ({
    showMore: {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 600,
        textDecoration: 'none'
    },    
    content: {
        ...theme.typography.body2
    }
}));

const ShowMore = (props) => {
    const classes = useStyles();

    const { children } = props;

    return (
        <>        
            <style>
                {
                    `
                        .anchor-button-see-more {
                            text-decoration: none;
                            color: #e4e6eb
                        }
                    `
                }
            </style>
            <ShowMoreText
                lines={3}
                more={<span className={classes.showMore}>Xem thêm</span>}
                less=""
                className={classes.content}
                anchorClass="anchor-button-see-more"
                expanded={false}
                truncatedEndingComponent='... '
                width={280}
            >
                {children}
            </ShowMoreText>
        </>
    )
}

export default ShowMore;