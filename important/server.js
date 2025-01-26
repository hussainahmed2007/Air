const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Express app setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Public folder serve karna
app.use(express.static(path.join(__dirname, 'public')));

// Real-time communication setup
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Jab koi user kuch text ya file bheje
    socket.on('shareData', (data) => {
        // Us data ko sabhi connected clients ko bhej do
        socket.broadcast.emit('receiveData', data);
    });

    // Jab user disconnect kare
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Server ko start karna
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
