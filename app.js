const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');

// configration
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/exp_manager").then(() =>{
    console.log("Connected to database");
}).catch(()=>{
    console.log("Connection to Failed");
})

//routes require
const roleRoutes = require('./routes/RoleRoutes')
const userRoutes = require('./routes/UserRoutes')

//use routes
app.use("/api",roleRoutes);
app.use("/api",userRoutes);

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})