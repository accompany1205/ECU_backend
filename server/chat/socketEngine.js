import SocketManger from "./socketManager.js";
const socketManager = new SocketManger();

class SocketEngine {
    constructor(io) {
        this.io = io;
        this.sockets - {};
        this.users = {};
        this.init();
    }
    async init() {
        console.log('#init')
        this.io.on('connection', function (socket) {
            console.log('Server socket created');
            socket.on('register', (data) => {
                console.log('Register', data);
                console.log(socket.id);
                if(data.userId)
                    socketManager.addUser(socket, data.userId);
            })
            socket.on('message',(data)=>{
                console.log('message', data);
                socketManager.sendMessage(socket, data);
            })
            socket.on('disconnect', () => {
                console.log('socket disconnected', socket.id);
                socketManager.deleteUser(socket);
            })
        })

    }
    
    
}
export default SocketEngine;
