import _ from "lodash";
import axios from "axios";
import { API_URL } from "../config";
import { havedLogin } from "@/helper/account";

export function createPost(params) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post`, params, {
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
        axios.get(`${API_URL}/post`) .then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => reject(error));
    })
}

export function getPost(slug) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/post/content/${slug}`) .then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => reject(error));
    });
}


export function getPostByUser(userId) {
    return new Promise((resolve, reject) => {

        axios.get(`${API_URL}/post/user/${userId}`).then(response => {
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

export function reactPost(id ) { 
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post/react/${id}`, {},  {
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

export function unReactPost(id ) { 
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post/unreact/${id}`, {},  {
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

export function savePost(id ) { 
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post/save/${id}`, {},  {
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

export function unSavePost(id ) { 
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post/unsave/${id}`, {},  {
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

export function getCommentsPost(postId) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/post/comment/post/${postId}`) .then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => reject(error));
    });
}


export function commentPost(postId, params) {
    return new Promise((resolve, reject) => {
        const token = havedLogin();

        axios.post(`${API_URL}/post/comment/post/${postId}`, params, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const { data } = response;
            
            resolve(data);
        }).catch(error => reject(error))
    })
}