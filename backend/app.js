const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors()); // enabled cors

let todos = []

const log = (...msg) => console.log(msg)

app.get('/api/todo/', (req, res) => {
    log('fetching records', req.body);
    res.send(todos);
});

app.post('/api/todo/', (req, res) => {
    log('adding record started:', req.body);
    todos.push({ id: todos.length + 1, title: req.body.title })
    res.status(200).send('Record added successfully')
});

app.put('/api/todo/:id/', (req, res) => {
    log('updating record started for id:', req.params.id, req.body);
    todos = todos.map((todo) => todo.id == req.params.id ? { ...todo, ...req.body } : todo);
    res.send('Record updated successfully')
});

app.delete('/api/todo/:id/', (req, res) => {
    log('deleting record started for id:', req.params.id);
    todos = todos.filter((todo) => todo.id != req.params.id)
    res.send('Record deleted successfully')
});

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});
