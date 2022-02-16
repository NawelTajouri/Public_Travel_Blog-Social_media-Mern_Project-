const express = require('express')
const connectDB = require('./config/connectDB');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const formidableMiddleware = require('express-formidable');
AdminBro.registerAdapter(AdminBroMongoose)
require("dotenv").config({path:"./config/.env"});
const mongoose = require('mongoose')
const app = express();
const User = require('./models/usermodel');
app.use(formidableMiddleware());
//connect to DB
connectDB();
// AdminRouter
const adminBro = new AdminBro({
    resources: [User],
    rootPath: '/admin',
  })
  const router = AdminBroExpress.buildRouter(adminBro)
  app.use(adminBro.options.rootPath, router)
  const run = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    const portAdmin = 5000;
    app.listen(portAdmin, (err) => err ? console.error(err) : console.log('Admin is required'));
  }
  
  run()