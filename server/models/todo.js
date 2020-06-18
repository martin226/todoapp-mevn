const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    },
    editing:{
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        required: true
    }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;