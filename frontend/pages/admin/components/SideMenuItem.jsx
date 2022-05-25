const SideMenuItem = props => {
    const { pageUrl } = props;
    const itemName = props.children;

    return (
        <>
            <li className="nav-item active">
                <a href={pageUrl} className="nav-link">
                    <span className="icon"></span>
                    <span className="menu-title">{itemName}</span>
                </a>
            </li>
        </>
    )
}

export default SideMenuItem;