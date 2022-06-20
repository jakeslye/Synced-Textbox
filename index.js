const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var content = `hello world`;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/index.js", (req, res) => {
  res.sendFile(__dirname + "/views/index.js");
});


io.on('connection', (socket) => {
  console.log('connection');
  
  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('get', () => {
    socket.emit('update', content);
  });

  socket.on('write', (msg) => {
    socket.broadcast.emit('update', msg);
  });
});

http.listen(port, () => {
  console.log("Server started");
});
