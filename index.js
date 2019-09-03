const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const todoRoutes = require('./routes/todo')

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

app.use('/todos', todoRoutes);

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