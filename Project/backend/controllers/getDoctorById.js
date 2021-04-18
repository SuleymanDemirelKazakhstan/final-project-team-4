const mongoose = require('mongoose');


const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection is established successfully!')
});