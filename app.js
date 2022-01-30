const express = require("express")
const app = express()

app.use(express.static("./public"))

app.listen(5000,()=>{
    console.log("Server listening to port 5000....");
})