import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        fetchNotifications: (state, { payload }) => {
            state.push(...payload)
        },
        markReadItem: (state, { payload }) => {
            const index = state.findIndex(item => item._id === payload)
            state[index].isRead = true;
        },
        markAllNotifAsRead: state => {
            for (const notif of state) {
                notif.isRead = true;
            }
        },
        appendNotif: (state, { payload }) => {
            state.unshift(payload);
        }
    }
})

export const { fetchNotifications, markReadItem, markAllNotifAsRead, appendNotif } = notificationsSlice.actions

export default notificationsSlice.reducer 