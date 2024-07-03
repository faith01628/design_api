const express = require('express');
const db = require('./database.js');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
// const localtunnel = require('localtunnel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// (async () => {
//     const tunnel = await localtunnel({ port: 3000 });

//     // the assigned public url for your tunnel
//     // i.e. https://abcdefgjhij.localtunnel.me
//     tunnel.url;

//     tunnel.on('close', () => {
//         // tunnels are closed
//     });
// })();

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// connect controller
const { authenticateAdminToken, authenticateBothTokens, authenticateUserToken } = require('./auth');
const { getUserData, createUser, deleteUser, getUserById, updateUser } = require('./Controller/accountController');
const { login } = require('./Controller/loginController');
const { getInfoUserData, getInfoUserById, createInfoUser, deleteinfoUser, updateinfoUser } = require('./Controller/infoController');
const { getProfileData, createProfile, deleteProfile, updateProfile, getProfileById } = require('./Controller/profileController.js');
const { getLink, getLinkById, createLink, deleteLink, updateLink } = require('./Controller/linkController.js');
const { getImg, create } = require('./Controller/imgController.js');
const { viewUser } = require('./Controller/viewUserController.js');
const { getApi, getApiById, createApi, deleteApi, updateApi, updateActiveOn, updateActiveOff } = require('./Controller/apiController.js');
const { getBio, getBioById, createBio, deleteBio, updateBio } = require('./Controller/bioController.js');

// up 1 file
app.post('/img', upload.single('img'), create);

// up 2 trường và mỗi trường được 10 file
// app.post('/img', upload.fields([{ name: 'file', maxCount: 10 }, { name: 'img', maxCount: 10 }]), create);

//up 10 file trong 1 trường
// app.post('/img', upload.array('img', 10), create);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/view/html/login.html'));
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/view/html/home.html'));
})


app.get('/getimg', getImg);

// connect route
app.get('/users', authenticateAdminToken, getUserData);
app.post('/createuser', createUser);
app.delete('/deleteuser/:id', authenticateAdminToken, deleteUser);
app.get('/users/:id', authenticateBothTokens, getUserById);
app.put('/updateuser/:id', authenticateAdminToken, updateUser);

app.get('/info', authenticateAdminToken, getInfoUserData);
app.get('/info/:id', authenticateBothTokens, getInfoUserById);
app.post('/createinfo', upload.fields([{ name: 'avata' }, { name: 'background' }]), authenticateBothTokens, createInfoUser);
app.delete('/deleteinfo/:id', authenticateAdminToken, deleteinfoUser);
app.put('/updateinfo/:id', upload.fields([{ name: 'avata' }, { name: 'background' }]), authenticateBothTokens, updateinfoUser);

app.get('/profile', authenticateAdminToken, getProfileData);
app.get('/profilebyid', authenticateBothTokens, getProfileById);
app.post('/createprofile', upload.fields([{ name: 'avata' }, { name: 'background' }, { name: 'backgroundavata' }]), authenticateBothTokens, createProfile);
app.delete('/deleteprofile/:id', authenticateAdminToken, deleteProfile);
app.put('/updateprofile/:id', upload.fields([{ name: 'avata' }, { name: 'background' }, { name: 'backgroundavata' }]), authenticateBothTokens, updateProfile);

app.get('/link', authenticateAdminToken, getLink);
app.get('/linkbydi', authenticateBothTokens, getLinkById);
app.post('/createlink', authenticateBothTokens, createLink);
app.delete('/deletelink/:id', authenticateAdminToken, deleteLink);
app.put('/updatelink/:id', authenticateBothTokens, updateLink);

app.get('/viewuser/:id', viewUser);

app.get('/api', authenticateAdminToken, getApi);
app.get('/api/:id', authenticateAdminToken, getApiById);
app.post('/createapi', authenticateAdminToken, createApi);
app.delete('/deleteapi/:id', authenticateAdminToken, deleteApi);
app.put('/updateapi/:id', authenticateAdminToken, updateApi);
app.put('/activeOn/:id', authenticateAdminToken, updateActiveOn);
app.put('/activeOff/:id', authenticateAdminToken, updateActiveOff);

app.get('/bio', getBio);
app.get('/biobyid', authenticateBothTokens, getBioById);
app.post('/createbio', upload.fields([{ name: 'imgbio' }]), createBio);
app.delete('/deletebio/:id', authenticateAdminToken, deleteBio);
app.put('/updatebio/:id', upload.fields([{ name: 'imgbio' }]), authenticateBothTokens, updateBio);

app.post('/login', login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
