import { save } from '@api/cv';
import React, { useEffect, useState } from 'react';
import { getMetaAccount } from '@/helper/account';
const CartCv = () => {
    const [data,setData] = useState({
        title: "",
        skill:"",
        education:"",
        link:"",
        username: ""

    });
    useEffect(() => {
        const newdata = { ...data }
        newdata.username =  getMetaAccount().username
        setData(newdata);
    }, []);

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
       
       
    }
    function handleFile(e){
        const newdata = { ...data }
        newdata[e.target.id] = e.target.files[0];
        setData(newdata)
       
    }
    function submit() {
            save(data).then(item=>{
                if(item == true) 
                window.alert("submit CV successful")
                else
                window.alert("submit CV fail")
            })
    }
    return (
        <>

            <div>
                <div className="form-group">
                    <label id='title' className='title' for="formGroupExampleInput">Title :</label>
                    <input  onChange={(e) => handle(e)} type="text" class="form-control" id='title' placeholder="Loại CV" />
                </div>
                <div className="form-group">
                    <label className='title' for="formGroupExampleInput2">Skill :</label>
                    <input  onChange={(e) => handle(e)} type="text" class="form-control" id='skill' placeholder="Kỉ năng" />
                </div>
                <div className="form-group">
                    <label className='title' for="formGroupExampleInput2">Education :</label>
                    <input  onChange={(e) => handle(e)} type="text" class="form-control" id='education' placeholder="Trường đại học" />
                </div>
                <div className="form-group">
                    <label className='title' for="formGroupExampleInput2">CV file :</label>
                    <input  onChange={(e) => handleFile(e)} type="file" class="form-control" id='link'  placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                <style jsx>{`
                 .title {
                     margin-top: 10px;
                     margin-bottom: 10px;
                     font-size: 18px;
                    }
                 .btn {
                    margin-top: 20px;
                 }   
                 `}</style>
            </div>
        </>
    );
}

export default CartCv;


