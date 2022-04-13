import axios from "axios";
import { API_URL } from "../config";

export function getUserByUsername(username) {
    return new Promise((resolve, reject) => {

        axios.get(`${API_URL}/api/v1/user/${username}`, {

        }).then(response => {
            const { statusCode } = response.data;

            if (statusCode == 401) {
                resolve(null);
            }
            else {
                resolve(response.data)
            }

            resolve(data);
        }).catch(error => reject(error))
    })
}

export function login(params) {
    delete params.confirmPassword;
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/api/v1/login`, params).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error))
    })
}


export function USERregister(params) {
    delete params.confirmPassword;
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/api/v1/user/register`, params).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => { console.log(error); reject(error) })
    })
}







