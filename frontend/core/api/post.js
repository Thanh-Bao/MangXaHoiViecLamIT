import _ from "lodash";
import axios from "axios";
import { API_URL } from "../config";
import { havedLogin } from "@/helper/account";

export function createPost(params) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/api/v1/post/save`, params, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error))
    })
}

export function getPosts() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/api/v1/post/all`).then(response => {
            const { data } = response;

            resolve(data);
        }).catch(error => reject(error));
    })
}

export function getPost(slug) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/post/content/${slug}`).then(response => {
            const { data } = response;

            resolve(data);
        }).catch(error => reject(error));
    });
}


export function getPostByUser(userId) {
    return new Promise((resolve, reject) => {

        axios.get(`${API_URL}/api/v1/post/user/${userId}`).then(response => {
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
