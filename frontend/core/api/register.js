import axios from "axios";
import _ from "lodash";
import { API_URL } from "../config";

export default function register(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/auth/user/register`, params).then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => {reject(error) } )
    })
}