import axios from "axios";
import { API_URL } from "../config";

export function search(params) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost/api/v1/post/filter`, params).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error));
    });
}

export function getProvince() {
    return new Promise((resolve, reject) => {
        axios.get(`https://provinces.open-api.vn/api/p/?depth=2`).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error));
    });
}

export function getDistric(provinceId) {
    return new Promise((resolve, reject) => {
        axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error));
    });
}
export function getWard(distric_id) {
    return new Promise((resolve, reject) => {
        axios.get(`https://provinces.open-api.vn/api/d/${distric_id}?depth=2`).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error));
    });
}