import React, { useEffect } from 'react';
import { Toolbar, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './footer';
import Header from './header';
import { Scrollbars } from 'react-custom-scrollbars-2';

import ReactGA from 'react-ga';
import { GG_CONFIG, IS_DEV } from '@/config';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.primary.bgColor,
        maxWidth: "100%"
    },
    wrapperNoHeader: {
        paddingLeft: '0',
        paddingRight: '0'
    },
    wrapperHaveHeader: {

    }
}));

const WebLayout = (props) => { 
    const { children, header = true } = props;
    const classes = useStyles();

    useEffect(() => {        
        if (IS_DEV == false) {
            ReactGA.initialize(GG_CONFIG.ANALYTICS);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }, [null])

    return (
        <React.Fragment>
            {header && <Header /> }
            
            <Scrollbars className={classes.wrapper} style={{ height: '100vh' }} universal={true}>
                {header && <Toolbar /> }

                <Container className={header ? classes.wrapperHaveHeader : classes.wrapperNoHeader} maxWidth='xl'>{children}</Container>

                {header && <Toolbar /> }
            </Scrollbars>

            <Footer />
        </React.Fragment>
    )   
}

export default WebLayout;