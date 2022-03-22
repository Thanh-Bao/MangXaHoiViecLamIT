import axios from "axios";
import { API_URL } from "../config";
import { havedLogin } from "@/helper/account";

export function getUserByUsername(username) {
    return new Promise((resolve, reject) => {

        axios.get(`${API_URL}/user/profile/${username}`, {
                
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
    })
}

export function getNotifications(userId) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.get(`${API_URL}/notification/user/${userId}`,  {
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
    })
}

