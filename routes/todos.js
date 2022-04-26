const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();
const verify = require('../verifytoken');


//get all todos
router.get('/', verify, async (req, res) => {
    const user = req.user;
    console.log(user);
    try{
        const todos = await Todo.find({userId: user._id});
        res.json({todos: todos});
    } catch (e) {
        res.status(500).send({message: "Could not fetch your todos!"})
    }
})

//create todo
router.post('/', verify, async (req, res) => {
    const user = req.user;
    const todo = new Todo({
        title: req.body.title,
        userId: user._id,
    })
    try{
    const save = await todo.save();
    res.status(200).send({todo: save}); 
    } catch {
        res.status(400).send({message: err});
    }
})

//delete
router.delete('/:id', verify, async (req, res)=> {
    const deleted = await Todo.deleteOne({_id: req.params.id})
    res.send(deleted);
})

//update
router.patch('/:id', verify, async (req, res) => {
    const update = await Todo.updateOne({_id: req.params.id}, {$set: {title: req.body.title}})
    res.json({updatedData: update});
})



module.exports = router;