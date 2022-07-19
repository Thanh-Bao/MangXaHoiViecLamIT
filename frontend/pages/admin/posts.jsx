import SideMenuItem from "./components/SideMenuItem";
import DropdownProfile from "./components/DropdownProfile";
import StatBox from "./components/StatBox";
import RecentAlert from "./components/RecentAlert";
import ApplicantCard from "./components/ApplicantCard";

export default function Posts() {
    return (
        <>
            <div>
                <title>Posts</title>
                <style jsx>{`
                    .menu-profile {
                        margin-right: 4.1rem;
                    }

                    .main-navbar, .sidemenu-header {
                        background: white;
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
          
                    //asdfsafd
                </div>   
            </div>
        </>
    );

};
