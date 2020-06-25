import { io } from '../../../main.js'
import MessageModel from '../../database/models/Message';


const EventName = {
  JOIN_CONVERSATION: 'join_conversation',
  LEAVE_CONVERSATION: 'leave_conversation',
  NEW_MESSAGE: 'new_message',
  RECEIVE_MESSAGE: 'receive_message'
}

module.exports = (socket) => {

  /**
   * data:
   * {
   *     room_id: conversation._id,
   *     user: { username: user.username, _id: user._id }
   * }
   */
  socket.on(EventName.JOIN_CONVERSATION, function (data) {
    console.log(Date.now())
    console.log(`${data.user.username} has join conversation: ${data.room_id}`);
    socket.join(data.room_id);
  })


  socket.on(EventName.LEAVE_CONVERSATION, function (data) {

  })

  /**
   * data:
   * {
   *   room_id: conversation._id,
   *   user_id: 
   *  msg_content: messages,
   *   
   * }
   */
  socket.on("send_message", async function (data) {
    debugger;
    console.log("New message from " + data.user_id + " :" + data.msg_content.text);
    io.to(data.room_id).emit('receive_message', data);
    const message = new MessageModel({
      sender_id: data.user_id,
      content: data.msg_content[0].text,
      conversation: data.room_id
    })
    await message.save();
  })

};
