const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const todoService = require('./services/todo');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/todos", (req, res, next) => {
    const todos = todoService.getAll();
    res.status(200).json(todos);
});

app.post('/todos', (req, res, next) => {
    try {
        const newTodo = todoService.create(req.body);
        res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
});

app.get("/todos/:id", (req, res, next) => {
    try {
        const todo = todoService.get(req.params.id);
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
});

app.delete('/todos/:id', (req,  res, next) => {
    try {
        const deletedTodo = todoService.del(req.params.id);
        res.status(202).json(deletedTodo);
    } catch (err) {
        next(err);
    }
});

app.use((error, req, res, next) => {
    console.log(error);
    const {
        statusCode: status,
        message
    } = error;
    const data = error.data;
    res.status(status).json({
        message,
        data
    })
});

app.listen(port, () => console.log(`listening on ${port}`));