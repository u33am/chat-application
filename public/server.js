// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = []; // Store active users

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

// When a user connects
io.on('connection', (socket) => {
  let userName = '';

  // Handle new user
  socket.on('new user', (name) => {
    userName = name;
    users.push(userName);
    io.emit('new user', users); // Notify all users
  });

  // Handle chat messages
  socket.on('chat message', (data) => {
    io.emit('chat message', { message: data.message, nick: data.nick });
  });

  // Handle user typing status
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user); // Broadcast to others that the user is typing
  });

  // Handle stop typing status
  socket.on('stop typing', (user) => {
    socket.broadcast.emit('stop typing', user); // Broadcast to others that the user stopped typing
  });

  // Handle user disconnection (log out)
  socket.on('user disconnected', (user) => {
    const index = users.indexOf(user);
    if (index > -1) {
      users.splice(index, 1); // Remove user from the list
    }
    io.emit('user disconnected', user); // Notify all users
  });

  // Handle socket disconnect
  socket.on('disconnect', () => {
    if (userName) {
      const index = users.indexOf(userName);
      if (index > -1) {
        users.splice(index, 1); // Remove user from the list if they disconnect
      }
      io.emit('user disconnected', userName); // Notify all users
    }
  });
});

// Start the server on port 5000
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
