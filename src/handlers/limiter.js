const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    max: 200, // 200 requests per hour
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = limiter