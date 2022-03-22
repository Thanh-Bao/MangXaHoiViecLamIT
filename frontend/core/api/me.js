import { havedLogin } from "@/helper/account";
import axios from "axios";
import _ from "lodash";
import { API_URL } from "../config";

export default function me(params) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        if(token) {
            axios.get(`${API_URL}/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                const { statusCode } = response.data;

                if(statusCode == 401) {
                    resolve(null);
                }
                else { 
                    resolve(response.data)
                }
                
                resolve(data);
            }).catch(error => reject(error))
        }
        else {
            resolve(null);
        }
    })
}