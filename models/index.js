const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/AWD-todo-api');

mongoose.Promise = global.Promise;
    
module.exports.Todo = require('./todo');