const express = require('express');
const db = require('./database.js');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//connect controller
const { getUserData } = require('./Controller/accountController');
const { login } = require('./Controller/loginController');


//connect route
app.get('/users', getUserData);
app.post('/login', login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

