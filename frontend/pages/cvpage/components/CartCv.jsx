import { save } from '@api/cv';
import React, { useEffect, useState } from 'react';
const CartCv = () => {
    const [data,setData] = useState({
        title: "",
        skill:"",
        education:"",
        link:"",
        username:"duong"

    });
    function handle(e) {
        console.log(e);
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
       
    }
    function handleFile(e){
        console.log(e);
        const newdata = { ...data }
        newdata[e.target.id] = e.target.files[0];
        setData(newdata)
       
    }
    function submit() {
            save(data).then(item=>{
                console.log(item)
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
                 `}</style>
            </div>
        </>
    );
}

export default CartCv;


