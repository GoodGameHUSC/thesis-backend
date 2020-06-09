
import DBRef from '../../app/libs/ref';
import EVENT_NAME from '../../constants/EVENT_NAME';
const rootRef = () => new DBRef(EVENT_NAME.TASK);

const EventName = {
  JOIN_CONVERSATION: 'join_conversation',
  LEAVE_CONVERSATION: 'leave_conversation',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message'
}

module.exports = (socket) => {

  socket.on(EventName.JOIN_CONVERSATION, function (data) {

  })

  socket.on(EventName.LEAVE_CONVERSATION, function (data) {

  })

  socket.on(EventName.SEND_MESSAGE, function (data) {

  })

};
