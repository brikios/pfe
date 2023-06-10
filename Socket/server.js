const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId == userId);
  };
    
  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log(user); // Add this line to check the user object
      if (user) {
        console.log(user.socketId); // Add this line to check the socketId
        io.to(user.socketId).emit('getMessage', {
          senderId,
          text,
        });
      } else {
        console.log('User not found'); // Add this line to check if the user is not found
      }
    });
    
    
    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  