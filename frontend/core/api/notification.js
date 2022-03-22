import axios from "axios";
import { API_URL } from "../config";
import { havedLogin } from "@/helper/account";

export function readNotification(id) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/notification/read/only/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
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