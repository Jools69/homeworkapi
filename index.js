const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Set up Express app
const app = express();

// Use cors
app.use(cors());

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/homeworkDB');
mongoose.Promise = global.Promise;

// Use the body-parser middleware to get access to request bodies
app.use(bodyParser.json());

// Use the router middleware for our routes
app.use('/api', router);

// Create some middleware to catch and report errors
app.use(function(err,req,res,next){
    console.log("Api Error: " + err.message);
    res.status(422).send({error: err.message});
});

// Listen on port 3001 for requests
app.listen(process.env.port || 3001, function(){

    console.log('App now listening on Port 3001');

});
