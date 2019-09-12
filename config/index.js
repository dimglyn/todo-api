module.exports = {
    MONGOURI: process.env.NODE_ENV === 'stage' ? 
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-fux9z.mongodb.net/todoApp?retryWrites=true&w=majority` 
        : `mongodb://${process.env.NODE_ENV === 'development' ? 'mongo' : 'localhost:27017'}/todoApp`,
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080
}