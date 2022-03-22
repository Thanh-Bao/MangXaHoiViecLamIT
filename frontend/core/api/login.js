import axios from "axios";
import _ from "lodash";
import { API_URL } from "../config";

export default function login(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/auth/user/login`, params).then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => reject(error))
    })
}