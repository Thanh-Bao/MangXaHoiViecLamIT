import React, { useEffect } from 'react';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import '../styles/global.scss';
import { SnackbarProvider } from 'notistack';
import ConsentPolicy from '@/components/policy/consentPolicy';
import Cookies from 'universal-cookie';

export default function Application(props) {
    const { Component, pageProps } = props;

    const cookies = new Cookies();
    const consentPolicy = cookies.get('ACCEPT_POLICY');

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
                <title>Tìm Việc Làm IT</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>

            {consentPolicy ? null : <ConsentPolicy />}

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
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}