const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
    port,
    mongoURI
} = require('./config');
const cors = require('cors');
const todoRoutes = require('./routes/todo')

const app = express();

app.use(bodyParser.json());

app.use(cors());

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


mongoose.connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(`Mongoose connected on: ${mongoURI}`);
        app.listen(port, 'localhost', () => console.log(`listening on ${port}`))
    })
    .catch(err => console.log(err));