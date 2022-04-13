import React, { useEffect } from 'react';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import '../styles/global.scss';
import { SnackbarProvider } from 'notistack';
import { store } from '@/reduxToolkit/store';
import { Provider } from 'react-redux'

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