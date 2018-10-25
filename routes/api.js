const express = require('express');
const Homework = require('../models/homework'); 

const router = express.Router();

// Get the current homework from the database
router.get('/homework', function(req, res, next){
    Homework.find().then(function(homeworks){
        res.send(homeworks);
    }).catch(next);
});

// Get the list of students from the database
router.get('/homework/students', function(req, res, next){
    Homework.collection.distinct('student').then(function(students){
        res.send(students);
    }).catch(next);
});

// Get only the incomplete homework from the database
router.get('/homework/incomplete', function(req, res, next){
    Homework.find({complete: false}).then(function(outstandingHomework){
        res.send(outstandingHomework);
    }).catch(next);
});

// Add a new homework instance to the database
router.post('/homework', function(req, res, next){
    console.log('API - PUT - Body: ' + req.body);
    Homework.create(req.body).then(function(homework){
        console.log('Post performed to Database: ' + homework);
        res.send(homework);
    }).catch(next);
});

// Update some homework in the database
router.put('/homework/:id', function(req, res, next){
    Homework.findByIdAndUpdate(req.params.id, req.body).then(function(){
        Homework.findById(req.params.id).then(function(homework){
            res.send({type: 'PUT', homework: homework});
        })
    }).catch(next);
});

// Update a homework instance to set it complete
router.put('/homework/complete/:id', function(req, res, next)
{
    Homework.findOne({_id: req.params.id}).then(function(homework)
    {
        homework.complete = true;
        homework.save().then(function()
        {
            Homework.findById(req.params.id).then(function(hwork)
            {
                res.send(hwork);
            });
        });
    }).catch(next);
});

// Delete some homework from the database
router.delete('/homework/:id', function(req, res, next){
    Homework.findByIdAndDelete(req.params.id).then(function(homework){
        res.send(homework);
    }).catch(next);
});

module.exports = router;