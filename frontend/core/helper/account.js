import { LOCAL_STORAGE_NAME } from "@/config";

/**
 * set account
 */
export function setIdentifyAccountJWT(jwt) {
    localStorage.setItem(LOCAL_STORAGE_NAME.IDENTIFY_USER_JWT, jwt);
}

export function setMetaAccount(user) {
    localStorage.setItem(LOCAL_STORAGE_NAME.META_USER, JSON.stringify(user));
}

export function setAccount(jwt, metaUser) {
    setIdentifyAccountJWT(jwt);
    setMetaAccount(metaUser);
}

/**
 * free account
 */
export function freeIdentifyAccountJWT() {
    localStorage.removeItem(LOCAL_STORAGE_NAME.IDENTIFY_USER_JWT);
}

export function freeMetaAccount() {
    localStorage.removeItem(LOCAL_STORAGE_NAME.META_USER);
}

export function freeAccount() {
    freeIdentifyAccountJWT();
    freeMetaAccount();
}

/**
 * replace data
 */
export function replaceIdentifyAccountJWT(jwt) {
    freeIdentifyAccountJWT();
    setIdentifyAccountJWT(jwt);
}

export function replaceMetaAccount(user) {
    freeIdentifyAccountJWT();
    setIdentifyAccountJWT(user);
}

/**
 * Haved login
 */
export function havedLogin() {
    return localStorage.getItem(LOCAL_STORAGE_NAME.IDENTIFY_USER_JWT);
}

export function getMetaAccount() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME.META_USER));
}