const express = require('express')
const connectDB = require('./config/connectDB');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require("dotenv").config({path:"./config/.env"});
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const isAuth= require('./middlewares/authUser');
const requireAuth = require('./Middlewares/requireAuth');

app.use(cors());
app.use(express.static(path.join(__dirname,'../client/public/uploads/profile/')))
app.use(express.static(path.join(__dirname,'../client/public/uploads/posts/')))
//middlewares
app.use(express.json());

//connect to DB
connectDB();

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);
//jwt 
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
  
});

const port = process.env.PORT || 6000;
app.listen(port, (err) => err ? console.error(err) : console.log(`server is listening on port ${port}`));

