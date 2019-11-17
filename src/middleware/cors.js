const corsMiddleware = function(req, res, next) { // CORS
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT,OPTIONS")
    res.header("Access-Control-Max-Age", 600000)
    next()
}

export { corsMiddleware as default }