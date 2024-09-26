const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo');

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


const dbURI = 'mongodb+srv://preet:secret123@cluster0.eicun.mongodb.net/todolistDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

app.get('/get', async (req, res) => {
  try {
    const todos = await Todo.find();  
    res.status(200).json(todos);      
  } catch (err) {
    console.error('Error fetching todos:', err);  
    res.status(500).json({ message: 'Failed to fetch todos' });  
  }
});

app.put('/update/:id',(req, res) => {
    const {id} = req.params;
    Todo.findByIdAndUpdate({_id: id},{done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    Todo.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})



app.post('/add', async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task field is required' });
  }

  try {
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ message: 'Failed to create todo' });
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
