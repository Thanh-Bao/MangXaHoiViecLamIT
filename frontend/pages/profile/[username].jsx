import React, { useState } from 'react'

import Head from '@/layout/web/head';
import WebLayout from '@/layout/web';
import PersonalInfor from '@/components/profile/personalInfor';
import MyTopics from '@/components/profile/myTopics';
import TopicsSaved from '@/components/profile/topicsSaved';

import { Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUserByUsername } from '@api/user';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    wrappertabLists: {
        borderBottom: 'none',
        paddingLeft: 0
    },
    rootTab: {
        color: '#e4e6eb66'
    },

    selectedTab: {
        color: '#e4e6eb !important',
        borderColor: '#e4e6eb !important'
    }
}))

const styles = {
    tabs: { color: 'white', fontWeight: "bold" }
}

const menuItems = [
    {
        label: 'Thông tin tài khoản',
        tabContent(user) { return <PersonalInfor user={user} /> }
    },
    {
        label: 'Bài viết đã đăng',
        tabContent(user) { return <MyTopics user={user} /> }
    },
    {
        label: 'Bài viết đã lưu',
        tabContent(user) { return <TopicsSaved user={user} /> }
    }
]

const Profile = (props) => {
    const classes = useStyles();
    const { user } = props;

    const [tabIndex, setTabIndex] = useState('0');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Head
                title={`${user.username} - Người dùng`}
            />
            <WebLayout>
                <Box sx={{ width: '100%', typography: 'body2' }}>
                    <TabContext value={tabIndex}>
                        <Box>
                            <TabList onChange={handleChange} className={classes.wrappertabLists} >
                                {menuItems.map((item, tabIndex) => <Tab key={tabIndex} classes={{ selected: classes.selectedTab, root: classes.rootTab }} label={item.label} value={tabIndex.toString()} />)}
                            </TabList>
                        </Box>
                        {menuItems.map((item, tabIndex) => <TabPanel key={tabIndex} value={tabIndex.toString()}>{item.tabContent(user)}</TabPanel>)}
                    </TabContext>
                </Box>
            </WebLayout>
        </>
    )
}

Profile.getInitialProps = async (ctx) => {
    const { username } = ctx.query;

    const user = await getUserByUsername(username);

    return { user };
}

export default Profile
