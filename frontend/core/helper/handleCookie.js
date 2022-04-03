import { COOKIE } from '@/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const havedAcceptPolicy = () => {
    return cookies.get('ACCEPT_POLICY');
}

export const acceptPolicy = () => {
    cookies.set('ACCEPT_POLICY', true, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 50000) });
}

export const setMetaAccountCookie = user => {
    cookies.set(COOKIE.META_USER.USERNAME, user.username, { path: '/', expires: new Date(Date.now() + 9999999999999) });
    cookies.set(COOKIE.META_USER.USERID, user._id, { path: '/', expires: new Date(Date.now() + 9999999999999) });
}

export const freeMetaAccountCookie = () => {
    const cookies = new Cookies();
    cookies.remove(COOKIE.META_USER.USERNAME, { path: '/' });
    cookies.remove(COOKIE.META_USER.USERID, { path: '/' });
}