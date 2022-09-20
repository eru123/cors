const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const rootdir = path.resolve(__dirname, '..');
const endpoint = require('./handlers/endpoint');
const limiter = require('./handlers/limiter');

app.use(bodyParser.json());
app.use(limiter);
app.all('/cors/:endpoint', endpoint);

const publicdir = path.join(rootdir, 'public');
app.use(express.static(publicdir));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


