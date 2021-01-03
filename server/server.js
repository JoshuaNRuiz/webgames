const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(8000, () => {
    console.log('listening on port 8000');
});