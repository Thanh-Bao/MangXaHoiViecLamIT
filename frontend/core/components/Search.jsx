import { getDistric, getProvince, getWard, search } from '@/api/search';
import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchPost } from '@/reduxTookit/slices/postsIndexSlice';
import { postMapper } from '@/helper/mapper';
import { useSnackbar } from 'notistack';

const Search = props => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({
        text: "",
        province: "0",
        distric: "0",
        ward: "0"
    })
    const [dataProvice, setDataProvice] = useState([]);
    const { arrPost: posts } = useSelector(state => state.posts);
    const counterRender = useRef(0);
    const dispatch = useDispatch();
    useEffect(() => {
        getProvince().then(item => {
            const dataP = item;
            setDataProvice(dataP);
        })
    }, []);

    // useEffect(() => {
    //     if (counterRender.current > 3) {
    //         submit();
    //     }
    // }, [data]);

    const [dataDistric, setDataDistric] = useState([]);
    const [dataWard, setDataWard] = useState([{
        code: 0,
        name: ''
    }]);
    const provinceList = dataProvice.map((item) => {
        return (
            <option value={item.code}>{item.name}</option>
        )
    })
    const districList = dataDistric.map((item) => {
        return (
            <option value={item.code}>{item.name}</option>
        )
    })
    const wardList = dataWard.map((item) => {
        return (
            <option value={item.code}>{item.name}</option>
        )
    })

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)

    }
    function handleProvince(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        if (e.target.value != 0) {
            getDistric(e.target.value).then(item => {
                const dataD = item;
                console.log(dataD);
                setDataDistric(dataD.districts);
                setDataWard([]);
            })
        } else {
            setDataDistric([]);
            setDataWard([]);
            const newdatareset = { ...data };
            newdatareset.distric = 0;
            newdatareset.province = 0;
            newdatareset.ward = 0;
            setData(newdatareset);
        }
        ;

    }
    function handleDistric(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        getWard(e.target.value).then(item => {
            const dataW = item;
            setDataWard(dataW.wards);
        })
    }
    function submit() {
        const params = {
            text: data.text,
            province_id: parseInt(data.province),
            distric_id: parseInt(data.distric),
            ward_id: parseInt(data.ward)
        }
        search(params).then(posts => {
            console.log("df", posts)
            if (posts.length !== 0) {
                dispatch(searchPost(posts.map(post => ({
                    ...post,
                    content: post.description,
                    _id: post.id,
                    media: post.images.map(image => (
                        {
                            ...image,
                            _id: image.id,
                            url: `/images/${image.link}`
                        }
                    ))
                }))));
            } else {
                enqueueSnackbar('Kh??ng t??m th???y', { variant: 'error' });
            }
        });
    }
    return (
        <>
            {console.log(counterRender.current++)}
            <style jsx>{`
                    .search {
                        width: 25%;
                        margin: 10px 20px 10px 80px;
                        height: 35px;
                        }
                        .select-search {
                          width: 10%;
                              height: 30px;
                              margin-left: 10px;
                          margin-right: 20px;
                        }
                        .lable-search {
                          font-size: 20px;
                          margin-left : 20px;
                        }
                `}</style>
            <div class="form-search">

                <input className='search'
                    onChange={(e) => handle(e)} id="text" value={data.text} type="text" placeholder="T??m ki???m theo t??? kh??a" />
                <label className='lable-search' >T???nh :</label>
                <select className='select-search' id="province" value={data.province} onChange={(e) => handleProvince(e)}>
                    <option value="0">T???t c???</option>
                    {provinceList}
                </select>
                <label className='lable-search'>Qu???n :</label>
                <select className='select-search' id="distric" value={data.distric} onChange={(e) => handleDistric(e)}>
                    <option value="0"></option>
                    {districList}
                </select>
                <label className='lable-search' >Ph?????ng :</label>
                <select className='select-search' id="ward" value={data.ward} onChange={(e) => handle(e)}>
                    <option value="0"></option>
                    {wardList}
                </select>
                <button style={{ marginLeft: 20 + 'px' }} className="btn-danger" onClick={submit}>T??m ki???m</button>

            </div>
        </>
    )
}

export default Search;