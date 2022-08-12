const express = require('express');
const helmet = require ('helmet');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

mongoose.connect(process.env.GPMN_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(helmet());


app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    next();
});




app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
