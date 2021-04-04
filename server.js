const express = require('express')
const app = express()
const port = process.env.port || 3000
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
app.use(express.static('public'))
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

let io = require('socket.io')(server);

io.on('connection',(socket)=>{
  console.log(`new connection is : ${socket.id}`);

  socket.on('comment',(data)=>{
    // console.log(data);
    socket.broadcast.emit('comment',{...data,time:new Date()})
  })

})