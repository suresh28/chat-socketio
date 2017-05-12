var express = require('express');
var path= require('path');

var app=express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

//app.use('/static', express.static(path.join(__dirname, 'views')))

"use strict";

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/views/index.html');
});


io.on('connection',(socket)=>{
    console.log('user connected');


    io.emit('globalMessage', { msg: 'Hello, Welcome to Socket IO App' });
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected');

     });


     socket.on('chat-message',(msg)=>{
         console.log('displaying msg : ',msg);
           io.emit('chat-message',`Test added from Server   ${new Date().getHours()}::${new Date().getMinutes()}:: ${new Date().getSeconds()}  >>  ${msg}`);
     })

   


});



http.listen(3000, function(){
  console.log('listening on *:3000');
});