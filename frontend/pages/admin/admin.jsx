import SideMenuItem from "./components/SideMenuItem";
import DropdownProfile from "./components/DropdownProfile";
import StatBox from "./components/StatBox";
import RecentAlert from "./components/RecentAlert";
import ApplicantCard from "./components/ApplicantCard";

export default function Admin() {
    return (
        <>
            <div>
                <title>Admin</title>
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
          
                    <div className="breadcrumb-area">
                        <h1>Chào, Admin!</h1>
                    </div>
                  
                    <div className="dashboard-fun-fact-area">
                        <div className="row">
                            <StatBox />
                        </div>
                    </div>
                   
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="recent-notifications-box">
                                <h3>Thông báo gần đây</h3>
                                <ul>
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Java Developer'} />
                                    <RecentAlert employee={'Jonathon Ronan'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Hau'} jobTitle={'QA'} />
                                </ul>
                            </div>
                        </div>

                    </div>
           
                    <div className="all-applicants-box">
                        <h2>Ứng viên gần đây</h2>
                        <div className="row">
                            <ApplicantCard name={'Jonathon Ronan'}
                                job={'IT Specialist'}
                                place={'USA'}
                                jobType={'Part Time'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'Quality Assurance'}
                                place={'Canada'}
                                jobType={'Internship'}
                            />
                            <ApplicantCard name={'Trần Văn Khoa'}
                                job={'Manager'}
                                place={'Australia'}
                                jobType={'Full Time'}
                            />
                        </div>
                    </div>
                </div>   
            </div>
        </>
    );

};
