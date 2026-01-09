const express = require("express")
const app = express()

const http =require("http").createServer(app)
const PORT = 2005

http.listen(PORT,() =>{
  console.log(`listen at Port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.post("/",(req,res) =>{
  res.sendFile(__dirname + '/index.html')
})

const io = require('socket.io')(http)
io.on("connection",(socket) =>{
  console.log('connected')
  
  socket.on("message",(smg) =>{
    socket.broadcast.emit("message",smg)
  })
  
})