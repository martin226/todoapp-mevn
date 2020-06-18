const express = require("express");

const ObjectId = require('mongoose').Types.ObjectId;
const isValidObjectId = require('mongoose').isValidObjectId;

const Todo = require("../models/todo");

const router = express.Router();

// Retrieve all todo tasks
router.get('/todos', (req, res) => {

    // Find all from MongoDB and return array
    Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => console.log(err));
});

// Add todo task
router.post('/todo', (req, res) => {

    // If todo task is not present in request, return a 400 error
    if (!req.body.todo || req.body.todo === "" || !req.body.created) {
        return res.status(400).json({
            "error": 400
        });
    }

    // Create a Todo object and save to MongoDB
    const newTodo = new Todo({
        todo: req.body.todo,
        created: req.body.created
    })
    newTodo
        .save()
        .then((todo) => {
            res.status(201).json(todo);
        })
        .catch((err) => console.log(err));
});

// Retrieve single todo task
router.get('/todo/:id', (req, res) => {
    let id = req.params.id;

    // If ID is not a valid ObjectID then return a 400 error
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            "error": 400
        });
    }

    // Find from MongoDB
    Todo.findOne({
            _id: new ObjectId(id)
        })
        .then(todo => {
            if (todo) {
                res.json(todo);
            } else {
                res.status(404).json({
                    "error": 404
                });
            }
        })
        .catch(err => console.log(err));
});

// Update todo task
router.put('/todo/:id', (req, res) => {
    let id = req.params.id;

    // If ID is not a valid ObjectID then return a 400 error
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            "error": 400
        }); 
    }
    // Retrieve current values
    Todo.findOne({
            _id: new ObjectId(id)
        })
        .then(todo => {
            if (todo) {

                // Update on MongoDB
                Todo.updateOne({
                        _id: new ObjectId(id)
                    }, {
                        todo: req.body.todo,
                        completed: req.body.completed,
                        editing: req.body.editing
                    })
                    .then(todo => {
                        res.status(204).json(todo);
                    })
                    .catch(err => console.log(err));

            } else {
                res.status(404).json({
                    "error": 404
                });
            }
        })
        .catch(err => console.log(err));
});

// Delete todo task
router.delete('/todo/:id', (req, res) => {
    let id = req.params.id;

    // If ID is not a valid ObjectID then return a 400 error
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            "error": 400
        });
    }

    // Delete from MongoDB
    Todo.findOneAndDelete({
            _id: new ObjectId(id)
        })
        .then(todo => {
            if (todo) {
                res.status(204).json(todo);
            } else {
                res.status(404).json({
                    "error": 404
                });
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;