const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const dotenv = require ('dotenv')

// Import route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')


// Import ENV var
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
 (err, db) => {
     if (err) {
         console.log("******UNABLE TO ESTABLISH CONNECTION******")
         console.log(process.env.DB_CONNECT)
     }
     else {
         console.log("*********CONNECTION TO MONGODB ESTABLISHED******");
     }
 })


//Middleware
app.use(express.json()) ;
 
 // Route middleware
app.listen (3000, () => console.log("Server is running...."));
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);