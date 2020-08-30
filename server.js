const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db.js');
connectDB();  

app.listen(PORT, function(err){
    if(err){
        console.log('Error:' ,err); return;
    }
    console.log(`Listening on port: ${PORT}`);
})
