const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 60000, // 1 Minute
    max: 60, // limit each IP to 60 requests per 1 minute
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = limiter