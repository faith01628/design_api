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
const { getInfoUserData, getInfoUserById, createInfoUser, deleteinfoUser, updateinfoUser } = require('./Controller/infoController');
const { getProfileData, createProfile, deleteProfile, updateProfile, getProfileById } = require('./Controller/profileController.js');
const { getLink, getLinkById, createLink, deleteLink, updateLink } = require('./Controller/linkController.js');

//connect route
app.get('/users', authenticateAdminToken, getUserData);
app.post('/createuser', createUser);
app.delete('/deleteuser/:id', authenticateAdminToken, deleteUser);
app.get('/users/:id', authenticateBothTokens, getUserById);
app.put('/updateuser/:id', authenticateAdminToken, updateUser);

app.get('/info', authenticateAdminToken, getInfoUserData);
app.get('/info/:id', authenticateBothTokens, getInfoUserById);
app.post('/createinfo', authenticateBothTokens, createInfoUser);
app.delete('/deleteinfo/:id', authenticateAdminToken, deleteinfoUser);
app.put('/updateinfo/:id', authenticateBothTokens, updateinfoUser);

app.get('/profile', authenticateAdminToken, getProfileData);
app.get('/profile/:id', authenticateBothTokens, getProfileById);
app.post('/createprofile', authenticateBothTokens, createProfile);
app.delete('/deleteprofile/:id', authenticateAdminToken, deleteProfile);
app.put('/updateprofile/:id', authenticateBothTokens, updateProfile);

app.get('/link', authenticateAdminToken, getLink);
app.get('/link/:id', authenticateBothTokens, getLinkById);
app.post('/createlink', authenticateBothTokens, createLink);
app.delete('/deletelink/:id', authenticateAdminToken, deleteLink);
app.put('/updatelink/:id', authenticateBothTokens, updateLink);

app.post('/login', login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});