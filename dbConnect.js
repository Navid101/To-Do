const mongoose = require('mongoose')
const connection = {}

const dbConnect = async()=>{
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect("mongodb+srv://Todo:yLF9vPqr0clkRlqB@cluster0.equjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("connected to database");
}

module.exports = dbConnect