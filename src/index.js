const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(`mongodb+srv://${process.env.USER_CONN_MONGO}:${process.env.PASS_CONN_MONGO}@cluster0-ekyid.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
