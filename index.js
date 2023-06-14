const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./utils/db');
const path = require('path');
const Router = require('./routes/router');
app.use(express.json())
app.set("views" , path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname , "/public")))
app.set("view engine", "html");

app.use(Router);
app.get("/" , (req , res , next) =>{
    res.sendFile(path.join(__dirname , "/views/index.html"))
})

app.listen(3000 , () =>{
    console.log("The server is live on port 3000!");
})
module.exports = db;
