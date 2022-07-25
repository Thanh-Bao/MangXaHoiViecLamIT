import React from 'react';
import WebLayout from '@/layout/web';
import Head from '@/layout/web/head';
import CartCv from './components/CartCv';
const Cv = () => {
    return (
        <div>
            <Head title='Thông tin cá nhân' />
            <WebLayout>
                <div class="container">
                    <br></br>
                        <CartCv />
                </div>
            </WebLayout>
        </div>
    );
}

export default Cv;
