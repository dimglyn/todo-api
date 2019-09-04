const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {
    port,
    mongoURI
} = require('./config');
const cors = require('cors');

const app = express();

const logger = require('./util/logger');
const todoRoutes = require('./routes/todo');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/todos', todoRoutes);



app.use((error, req, res, next) => {
    logger.error(error);
    const {
        message
    } = error;
    const data = error.data;
    res.status(500).json({
        message,
        data
    })
});


mongoose.connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => {
        logger.info(`Mongoose connected on: ${mongoURI}`);
        app.listen(port, 'localhost', () => logger.info(`listening on ${port}`))
    })
    .catch(err => logger.error(err));