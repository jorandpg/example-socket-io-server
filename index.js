
const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static(publicPath) );


const PORT = process.env.PORT;
server.listen(PORT, (err) => {
    if(err) throw Error(err);

    console.log('Servidor corriendo en puerto', PORT);
});