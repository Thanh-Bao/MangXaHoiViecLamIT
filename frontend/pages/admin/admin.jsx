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
                        background: #81b9ff;
                    }

                `}</style>
                {/* Start Sidemenu Area */}
                <div className="sidemenu-area">
                    <div className="sidemenu-header">
                        <div className="responsive-burger-menu d-block d-lg-none">
                            <span className="top-bar" />
                            <span className="middle-bar" />
                            <span className="bottom-bar" />
                        </div>
                    </div>
                    <div className="sidemenu-body">
                        <ul className="sidemenu-nav metisMenu h-100" id="sidemenu-nav" data-simplebar>
                            <SideMenuItem pageUrl={'alo.html'}>Tổng quan</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Hồ sơ doanh nghiệp</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Đăng việc làm mới</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Quản lý việc làm</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Ứng viên</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Nhập CV</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Danh sách CV</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Tin nhắn</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Hóa đơn</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Resume Alerts</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Đổi mật khẩu</SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Thông tin cá nhân </SideMenuItem>
                            <SideMenuItem pageUrl={'alo.html'}>Đăng xuất</SideMenuItem>
                        </ul>
                    </div>
                </div>
                {/* End Sidemenu Area */}
                {/* Start Main Dashboard Content Wrapper Area */}
                <div className="main-dashboard-content d-flex flex-column">
                    {/* Start Navbar Area */}
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
                                                    <img src={'./assets/images/dashboard/user1.jpg'} className="rounded-circle" alt="image" />
                                                    <DropdownProfile />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    {/* End Navbar Area */}
                    {/* Breadcrumb Area */}
                    <div className="breadcrumb-area">
                        <h1>Chào, Andy!</h1>
                        <ol className="breadcrumb">
                            <li className="item"><a href="dashboard.html">Trang chủ</a></li>
                            <li className="item">Tổng quan</li>
                        </ol>
                    </div>
                    {/* End Breadcrumb Area */}
                    {/* Start Dashboard Fun Fact Area */}
                    <div className="dashboard-fun-fact-area">
                        <div className="row">
                            <StatBox count={100}>Bài đăng tuyển dụng</StatBox>
                            <StatBox count={6382}>Số lượng ứng tuyển</StatBox>
                            <StatBox count={3154}>Số lượng CV</StatBox>
                        </div>
                    </div>
                    {/* End Dashboard Fun Fact Area */}
                    {/* Start Notifications */}
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="recent-notifications-box">
                                <h3>Thông báo gần đây</h3>
                                <ul>
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                    <RecentAlert employee={'Toàn Nguyễn'} jobTitle={'Phi công'} />
                                </ul>
                            </div>
                        </div>

                    </div>
                    {/* End Notifications */}
                    {/* Start Applicants Area */}
                    <div className="all-applicants-box">
                        <h2>Ứng viên gần đây</h2>
                        <div className="row">
                            <ApplicantCard name={'Jonathon Ronan'}
                                job={'IT Specialist'}
                                place={'USA'}
                                jobType={'Part Time'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'Programmer'}
                                place={'Vietnam'}
                                jobType={'Full Time'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'Quality Assurance'}
                                place={'Canada'}
                                jobType={'Internship'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'Manager'}
                                place={'Australia'}
                                jobType={'Full Time'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'Engineer'}
                                place={'Germany'}
                                jobType={'Temporary'}
                            />
                            <ApplicantCard name={'Nguyễn An Toàn'}
                                job={'UI/UX Designer'}
                                place={'Campuchia'}
                                jobType={'Full Time'}
                            />
                        </div>
                    </div>
                    {/* Start Applicants Area */}
                </div>
                {/* End Main Dashboard Content Wrapper Area */}
                {/* Links of JS files */}
            </div>
        </>
    );

};
