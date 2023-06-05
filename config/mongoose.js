const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/movieproject");

const db = mongoose.connection;


db.on("connected",(err)=>{
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("DB connected !! ");
})


module.exports = db;