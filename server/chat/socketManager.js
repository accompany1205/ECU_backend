import Message from "../models/message.js";
import mongoose from "mongoose";

class SocketManger {
    constructor() {
        this.sockets = {};
        this.users = {};
    }
    addUser (socket, userId){
        this.sockets[userId] = socket;
        this.users[socket.id] = userId;
        console.log('new user added!');
    }
    async sendMessage (socket, data) {
        const {senderId, receiverId, content, name, avatar} = data;
        const message = new Message({
            _id: new mongoose.Types.ObjectId(),
            senderId: senderId,
            receiverId: receiverId,
            content: content,
            time: new Date(),
            isWatched: false
        })
        const savedMessage = await message.save();
        console.log(savedMessage);
        if(this.sockets[receiverId])
            this.sockets[receiverId].emit('message',{
                senderId:senderId,
                content:content,
                messageId: savedMessage._id,
                time: savedMessage.time,
                name:name,
                avatar: avatar
            })
        console.log('report', {
            content: content,
            time: new Date(),
        })
        socket.emit('report',{
            content: content,
            time: new Date(),
        })
    }
    deleteUser ( socket ) {
        let userId = this.users[socket.id];
        delete this.users[socket.id];
        delete this.sockets[userId];
        for (let k in this.sockets){
            this.sockets[k].emit('quitUser',{
                userId
            })
        }
        console.log(`user--${userId} deleted!`);
    } 
}
export default SocketManger;