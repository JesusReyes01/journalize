require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authController');
const entryCtrl = require('./entryController');
const darkModeCtrl = require('./darkModeController');
const nodeMailerCtrl = require('./nodeMailerController');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const path = require('path')

const app = express();

//FOR req.body
app.use(express.json());

//HOSTING
app.use(express.static(__dirname + '/../build'))
//causing axios not to work
// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })

//USER SESSION
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

//DATABASE CONNECTION
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//Auth Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
//Entry Endpoints
app.get('/api/entries', entryCtrl.getAllEntries)
app.get('/api/entries/single/:id', entryCtrl.getSingleEntry)
app.post('/api/entries/create', entryCtrl.createEntry)
app.put('/api/updateEntry/:id', entryCtrl.updateEntry)
app.delete('/api/entries/:id', entryCtrl.deleteEntry)
//DarkMode Endpoints
app.get('/api/darkMode', darkModeCtrl.getDarkMode)
app.put('/api/updateDarkMode', darkModeCtrl.updateDarkMode)
//NodeMailer
app.post('/api/email', nodeMailerCtrl.email);



app.listen(SERVER_PORT, () => console.log(`Server connected to port ${SERVER_PORT}`))