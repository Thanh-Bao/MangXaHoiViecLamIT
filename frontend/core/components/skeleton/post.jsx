import React from 'react';
import { Box, Skeleton } from '@mui/material';

class PostSkeleton extends React.Component {
    render() {
        return (
            <>
                <Skeleton height={100}  variant="rect" animation="wave" />

                <Box pt={0.5}>
                    <Skeleton height={20} animation="wave" />
                    <Skeleton height={20} animation="wave" width="80%" />
                </Box>
            </>            
        )
    }
}

export default PostSkeleton;