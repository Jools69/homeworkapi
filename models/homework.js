const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeworkSchema = new Schema({
    subject : {
        type: String,
        required: [true, 'Subject field is required']
    },

    dateSet : {
        type: Date
    },

    dateDue: {
        type: Date,
        required: [true, 'Date due field is required']
    },

    status: {
        type: String,
        default: 'Not started'
    },

    complete: {
        type: Boolean,
        default: false
    },

    student: {
        type: String,
        required: [true, 'Student field is required']
    }
});

// Now create the model
const Homework = mongoose.model('homework',HomeworkSchema);

module.exports = Homework;