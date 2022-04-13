import axios from "axios";
import { havedLogin } from "@/helper/account";
import _ from "lodash";
import { API_URL } from "../config";

export function upload(formData) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/api/v1/image/uploadFile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error))
    })
}

export function getPhoto(slug) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/post/photo/${slug}`).then(response => {
            const { data } = response;

            resolve(data);
        }).catch(error => reject(error));
    })
}