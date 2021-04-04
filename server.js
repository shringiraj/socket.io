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

commentList = require('./comment');
//console.log('ok');
app.post('/api/comment', (req, res) => {
  //console.log(req.body)
  commentList.storeComment({
    username: "Shringiraj Dewangan",
    comment: "The flowers are so beautyfull."
  })
});
app.get('/api/comments', (req, res) => {
  res.json(commentList.getComments())
})

let io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`new connection is : ${socket.id}`);
  socket.on('comment', (data) => {
    // console.log(data);
    socket.broadcast.emit('comment', { ...data, time: new Date() })
  })
})