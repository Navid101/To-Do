const mongoose = require('mongoose')


const TodoSchema = new mongoose.Schema(
    {
        todo:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.models.todos || mongoose.model("todos",TodoSchema);