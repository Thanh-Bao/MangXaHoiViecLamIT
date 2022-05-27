import SideMenuItem from "./components/SideMenuItem";
import DropdownProfile from "./components/DropdownProfile";
import StatBox from "./components/StatBox";
import RecentAlert from "./components/RecentAlert";

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
                    {/* Start Notifications and Invoices Area */}
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
                        <div className="col-lg-6 col-md-12">
                            <div className="invoices-box">
                                <h3>Hóa đơn</h3>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="paid">Paid</li>
                                            <li>Order: #181815</li>
                                            <li>Date: 14/08/2021</li>
                                        </ul>
                                        <span>Premium Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="unpaid">Unpaid</li>
                                            <li>Order: #181814</li>
                                            <li>Date: 13/08/2021</li>
                                        </ul>
                                        <span>Advance Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="paid">Paid</li>
                                            <li>Order: #181813</li>
                                            <li>Date: 12/08/2021</li>
                                        </ul>
                                        <span>Starter Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="unpaid">Unpaid</li>
                                            <li>Order: #181812</li>
                                            <li>Date: 11/08/2021</li>
                                        </ul>
                                        <span>Basic Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="paid">Paid</li>
                                            <li>Order: #181815</li>
                                            <li>Date: 14/08/2021</li>
                                        </ul>
                                        <span>Premium Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="unpaid">Unpaid</li>
                                            <li>Order: #181814</li>
                                            <li>Date: 13/08/2021</li>
                                        </ul>
                                        <span>Advance Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="ri-file-line" />
                                        </div>
                                        <ul>
                                            <li className="paid">Paid</li>
                                            <li>Order: #181813</li>
                                            <li>Date: 12/08/2021</li>
                                        </ul>
                                        <span>Starter Plan</span>
                                        <a href="dashboard-invoice.html" className="default-btn">View Invoice</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End Notifications and Invoices Area */}
                    {/* Start Applicants Area */}
                    <div className="all-applicants-box">
                        <h2>Ứng viên gần đây</h2>
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-1.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">Jonathon Ronan</a>
                                        </h3>
                                        <span>IT Specialist</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> USA</li>
                                            <li><i className="ri-time-line" /> Part Time</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-2.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">John Carter</a>
                                        </h3>
                                        <span>UI/UX Designer</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> Australia</li>
                                            <li><i className="ri-time-line" /> Full Time</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-3.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">David Johan</a>
                                        </h3>
                                        <span>Programmer</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> Francisco</li>
                                            <li><i className="ri-time-line" /> Temporary</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-4.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">Betty Stevens</a>
                                        </h3>
                                        <span>Manager</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> Canada</li>
                                            <li><i className="ri-time-line" /> Part Time</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-5.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">Joshua Moreno</a>
                                        </h3>
                                        <span>Engineer</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> Japan</li>
                                            <li><i className="ri-time-line" /> Full Time</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="single-applicants-card">
                                    <div className="image">
                                        <a href="#"><img src="assets/images/applicants/applicants-6.jpg" alt="image" /></a>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <a href="candidates-details-1.html">Jerry Thomas</a>
                                        </h3>
                                        <span>Quality Assurance</span>
                                        <ul className="job-info">
                                            <li><i className="ri-map-pin-line" /> Germany</li>
                                            <li><i className="ri-time-line" /> Internship</li>
                                        </ul>
                                        <div className="applicants-footer">
                                            <ul className="option-list">
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="View Aplication" type="button"><i className="ri-eye-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve Aplication" type="button"><i className="ri-check-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject Aplication" type="button"><i className="ri-close-line" /></button></li>
                                                <li><button className="option-btn d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Aplication" type="button"><i className="ri-delete-bin-line" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
