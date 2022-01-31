const dbConnect = require('./dbConnect')
const Todo = require('./models/Todo')
dbConnect()


//setting up the server starts
const express = require("express")
const { json } = require('express/lib/response')
const app = express()

const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.static("./public"))

app.listen(port,()=>{
    console.log("Server listening to port 5000....");
})

//server setup ends

//fetch todos
app.get('/api/todos',async (req,res)=>{
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json("No such To Do found")
    }
})

app.post('/api/todos',async(req,res)=>{
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json("Failed To Create Todo")
    }
})

app.get('/api/todos/:_id',(req,res)=>{
    console.log(req.params._id);
    res.send("Single Todo")
})