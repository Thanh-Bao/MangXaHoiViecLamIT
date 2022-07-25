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
                    <DropdownItem href="#pablo">
                        <div className="info text-center">
                            <span className="name">Admin Smith</span>
                            <p className="mb-3 email">smith@gmail.com</p>
                        </div>
                    </DropdownItem>

                    <DropdownItem href="#pablo">
                        <div className="nav-item active text-center">
                            <a href='/admin/admin' className="nav-link">
                                <span className="menu-title">Tổng quan</span>
                            </a>
                        </div>
                    </DropdownItem>
                    <DropdownItem href="#pablo">
                        <div className="nav-item text-center">
                            <a href='/admin/users' className="nav-link">
                                <span className="menu-title">Users</span>
                            </a>
                        </div></DropdownItem>
                    <DropdownItem href='/admin/cv'>
                        <div className="nav-item text-center">
                            <a href='/admin/cv' className="nav-link">
                                <span className="menu-title">CV</span>
                            </a>
                        </div>
                    </DropdownItem>

                    <DropdownItem href="#pablo">
                        <ul className="profile-nav text-center">
                            <li className="nav-item">
                                <a href='/admin/adminLogin' className="nav-link"><span>Đăng xuất</span></a>
                            </li>
                        </ul>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </span>
    )
}

export default DropdownProfile;