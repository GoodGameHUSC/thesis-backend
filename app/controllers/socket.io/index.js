import { io } from "../../main";
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

io.on('connection', function (socket) {

  // auto import all file in routes/realtime except itself
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file.indexOf('_index') == -1);
    })
    .forEach(file => {
      require(path.join(__dirname, file))(socket);
    });


  socket.on('disconnect', function () {
    // if (socket.userId) {
    //   CustomerService.removeSocketId(socket.userId, socket.id);
    // }
    // io.emit('User disconnected !');
    // logger.info("User disconnected !", {
    //   device: socket.handshake.headers['user-agent'],
    // });

    console.log("Disconnect from ", socket.handshake.headers['user-agent'])
  });

});
