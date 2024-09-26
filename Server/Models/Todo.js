const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task is required'],  
        trim: true,  
        minlength: [1, 'Task must be at least 1 character long'],  
    },
    done: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
