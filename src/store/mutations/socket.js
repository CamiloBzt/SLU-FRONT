export default {
    initSocket (state, socket) {
        if(socket){
            state.socket.socketClient = socket;
            state.socket.socketId = socket.id;
        }
    },

    setNotifications (state, notificationList) {
        state.socket.notificationList = notificationList;     
    },

    disconnectSocket (state) {
        state.socket.socketId = '';
        state.socket.notificationList = [];
    }
}