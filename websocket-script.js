const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('postCreated', (post) => {
    console.log('New post created:', post);
});

socket.on('postUpdated', (post) => {
    console.log('Post updated:', post);
});

socket.on('postDeleted', (data) => {
    console.log('Post deleted:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});