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
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('./auth');
const { getUserData, createUser, deleteUser, getUserById, updateUser } = require('./Controller/accountController');
const { login } = require('./Controller/loginController');

//connect route
app.get('/users', authenticateAdminToken, getUserData);
app.post('/createuser', createUser);
app.delete('/deleteuser/:id', authenticateAdminToken, deleteUser);
app.get('/users/:id', authenticateBothTokens, getUserById);
app.put('/updateuser/:id', authenticateAdminToken, updateUser);

app.post('/login', login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});