/**
 * Created by anthony on 16/12/16.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
    console.log("client connected");
    /*
        messages:
        "up"
        "down"
        "ok"
        "back"
        "thanks"
        "tire"
        "link"
        "light problem"
        "can't see"
        "trunk"  
     */
    client.on("Ozbox_command", function (message) {
        console.log(message);
        client.broadcast.emit("box_command", message);
    });
    client.on("Oz_message", function (message) {
        console.log(message);
        client.broadcast.emit("input_message", message);
    });
});

app.get('/', function (req, res) {
    return res.status(200)
        .json({value: "it works !"})
});

server.listen(4200);