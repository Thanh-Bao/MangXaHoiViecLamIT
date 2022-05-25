import React, { useEffect } from 'react';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import '../styles/global.scss';
import { SnackbarProvider } from 'notistack';
import { store } from '@/reduxToolkit/store';
import { Provider } from 'react-redux';

import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/aos.css';
import '../public/assets/css/animate.min.css';
import '../public/assets/css/meanmenu.css';
import '../public/assets/css/flaticon.css';
import '../public/assets/css/odometer.min.css';
import '../public/assets/css/owl.theme.default.min.css';
import '../public/assets/css/magnific-popup.min.css';
import '../public/assets/css/fancybox.min.css';
import '../public/assets/css/selectize.min.css';
import '../public/assets/css/metismenu.min.css';
import '../public/assets/css/simplebar.min.css';
import '../public/assets/css/dropzone.min.css';
import '../public/assets/css/style.css';
import '../public/assets/css/navbar.css';
import '../public/assets/css/footer.css';
import '../public/assets/css/dashboard.css';
import '../public/assets/css/responsive.css';

export default function Application(props) {
    const { Component, pageProps } = props;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>WEB</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>

            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                <NextNprogress
                    color="#cb3837"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                />

                <SnackbarProvider maxSnack={1} anchorOrigin={{ horizontal: 'top', vertical: 'center' }}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}