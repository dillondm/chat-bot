const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express and create HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like the front-end)
app.use(express.static('public'));

// Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for messages from clients
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    // Emit message to all clients
    io.emit('chat message', msg);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Set up a simple route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
