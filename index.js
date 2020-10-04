const socketIO = require('socket.io')
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.render('index');
})

app.get('/chatroom/',(req,res)=>{

  res.render('chatroom',{
    username: null,
    room:null
  })
})

app.post('/chatroom/',(req,res)=>{
  res.render('chatroom',{
    username: req.body.name,
    room:req.body.room
  })
})

const io = socketIO(server);


io.on('connection', socket => {

  socket.on('join-room', room =>{
    socket.join(room)

    socket.on('message',(messageData) => {
      socket.broadcast.to(room).emit('message',messageData)
    })
  })
})

server.listen(3000);
console.log('running on port 3000')