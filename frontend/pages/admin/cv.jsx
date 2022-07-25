import SideMenuItem from "./components/SideMenuItem";
import DropdownProfile from "./components/DropdownProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'timeago.js';

export default function CV() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:80/api/v1/cv/getAll')
        .then((response) => {
            setContent(response.data);
        });

    }, []);

    return (
        <>
            <div>
                <title>CV</title>
                <style jsx>{`
                    .menu-profile {
                        margin-right: 4.1rem;
                    }

                    .main-navbar, .sidemenu-header {
                        background: white;
                    }

                    table tr{
                        line-height: 4rem;
                    }
                `}</style>

                <div className="sidemenu-area">
                    <div className="sidemenu-header">
                        <img className="ms-4" alt="logo" src='/logo.png' width='90' height='90' />
                    </div>
                    <div className="sidemenu-body">
                        <ul className="sidemenu-nav metisMenu h-100" id="sidemenu-nav" data-simplebar>
                            <SideMenuItem pageUrl={'/admin/admin'}>Tổng quan</SideMenuItem>
                            <SideMenuItem pageUrl={'/admin/posts'}>Posts</SideMenuItem>
                            <SideMenuItem pageUrl={'/admin/users'}>Users</SideMenuItem>
                            <SideMenuItem pageUrl={'/admin/cv'}>CV</SideMenuItem>
                        </ul>
                    </div>
                </div>
   
                <div className="main-dashboard-content d-flex flex-column">
                    <div className="navbar-area">
                        <div className="main-responsive-nav">
                            <div className="main-responsive-menu">
                                <div className="responsive-burger-menu d-lg-none d-block">
                                    <span className="top-bar" />
                                    <span className="middle-bar" />
                                    <span className="bottom-bar" />
                                </div>
                            </div>
                        </div>
                        <div className="main-navbar">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                    <div className="others-options d-flex align-items-center">
                                        <div className="">
                                            <div className="dropdown profile-nav-item">
                                                <div className="menu-profile">
                                                    <DropdownProfile />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
          
                    
                        <table className="table table-bordered table-hover table-warning">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Skill</th>
                                    <th scope="col">Education</th>
                                    <th scope="col">File name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map((cv) => {
                                    return (
                                        <tr>
                                            <th scope="row">{cv.id}</th>
                                            <td>{cv.username}</td>
                                            <td>{cv.title}</td>
                                            <td>{cv.skill}</td>
                                            <td>{cv.education}</td>
                                            <td>{cv.link}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                        </table>
                </div>   
            </div>
        </>
    );

};
