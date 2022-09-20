const _ = require('lodash');
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const c_req = {
            url: req.params.endpoint,
            method: req.method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                ..._.pick(req.headers, ['content-type', 'accept', 'accept-encoding']),
                'Cache-Control': 'no-cache',
            }
        }

        if (req?.body) c_req.data = req.body;
        if (req?.query) c_req.params = req.query;
        if (req?.files) c_req.files = req.files;

        const c_res = await axios(c_req);
        res.status(c_res.status).send(c_res.data);
    }
    catch (err) {
        res.status(500).send({
            error: err.message,
            code: err.code
        });
    }
}