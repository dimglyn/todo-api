module.exports = {
    MONGOURI: `mongodb://${process.env.HOST ? 'mongo' : 'localhost:27017'}/todoApp`,
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080   
}