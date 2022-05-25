import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
} from "reactstrap";

const DropdownProfile = props => {
    return (
        <span className="name">
            <UncontrolledDropdown className="d-inline">
                <DropdownToggle color="#f6f9fc">
                    Tài khoản
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="info text-center">
                            <span className="name">Andy Smith</span>
                            <p className="mb-3 email">hello@androsmith.com</p>
                        </div>
                    </DropdownItem>

                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="nav-item active text-center">
                            <a href="dashboard.html" className="nav-link">
                                <span className="menu-title">Tổng quan</span>
                            </a>
                        </div>
                    </DropdownItem>
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="nav-item text-center">
                            <a href="dashboard-applicants.html" className="nav-link">
                                <span className="menu-title">Ứng viên</span>
                            </a>
                        </div></DropdownItem>
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="nav-item text-center">
                            <a href="dashboard-submit-resume.html" className="nav-link">
                                <span className="menu-title">Nhập CV</span>
                            </a>
                        </div>
                    </DropdownItem>

                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                        <ul className="profile-nav text-center">
                            <li className="nav-item">
                                <a href="index.html" className="nav-link"><span>Đăng xuất</span></a>
                            </li>
                        </ul>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </span>
    )
}

export default DropdownProfile;