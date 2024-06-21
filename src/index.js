const express = require('express');
const db = require('./database.js');
const app = express();
const port = 3000;

const { getUserData } = require('./Controller/accountController');

app.get('/users', getUserData);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

