import React from 'react';
import NextHead from 'next/head';

import { SITE_NAME } from '@/config';

const Head = ({ title, description, image, brand, url, type }) => {
    const specificTitle = title ? title + ' | ' + SITE_NAME : SITE_NAME;

    return (
        <NextHead>
            <meta charSet="utf-8" />

            <title>{specificTitle}</title>
        </NextHead>
    )
}

export default Head;