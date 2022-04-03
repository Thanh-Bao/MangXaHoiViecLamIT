import { freeAccount } from '@/helper/account';
import { LogoutOutlined } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import router, { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { freeMetaAccountCookie } from '@/helper/handleCookie';

class RightMenuHeader extends React.Component {
    state = {
        anchorEl: null,
    }

    open(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleMenuClose() {
        this.setState({ anchorEl: null });
    }

    handleLogout() {
        freeAccount();
        freeMetaAccountCookie();

        if (this.props.afterLogout) {
            this.props.afterLogout();
        }
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <Menu
                id="right-menu-header"
                anchorEl={anchorEl}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        border: '1px solid #d3d4d5',
                    }
                }}
                onClose={() => { this.handleMenuClose() }}
            >
                <MenuItem>
                    <Button
                        edge="end"
                        variant="text"
                        startIcon={<PersonOutlineIcon />}
                        size='medium'
                        onClick={() => { router.push("/me") }}
                    >
                        Trang cá nhân
                    </Button>
                </MenuItem>
                <MenuItem >
                    <Button
                        variant="text"
                        startIcon={<LogoutOutlined />}
                        size='medium'
                        onClick={() => { this.handleLogout(); this.handleMenuClose(); }}
                    >
                        Đăng xuất
                    </Button>
                </MenuItem>
            </Menu>
        )
    }
}

export default RightMenuHeader;
