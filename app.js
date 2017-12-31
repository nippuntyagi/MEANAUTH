const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('err',(err)=>{
    console.log('Database error ' + err);
});

var app = express();

const users = require("./routes/users")
//Port Number
var port = 3000;

//CORS MiddleWare
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser MiddleWare
app.use(bodyParser.json());

//Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//indexRoute
app.get('/', (req,res)=>{
    res.send('Invalid Endpoint')
});

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//start server
app.listen(port, ()=>{
    console.log('Server started on port '+ port);
});