import axios from "axios";
export function save (formdata) {
    return new Promise((resolve, reject) => {
        var data = new FormData();
        data.append("title",formdata.title) ;
        data.append("skill",formdata.skill) ;
        data.append("education",formdata.education) ;
        data.append("username",formdata.username) ;
        data.append("file",formdata.link) ;
        axios({
            method: "post",
            url: "http://localhost/api/v1/cv/save",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(response => {
            const { data } = response;
            resolve(data);
        }).catch(error => reject(error));
    });
}