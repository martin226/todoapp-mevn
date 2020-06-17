const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    },
    edited:{
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;