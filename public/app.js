$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err) {
        console.log(err)
    });

    $('#todoInput').keypress(function(event) {
        // event listener for enter key
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent())
    })
});

function updateTodo(todo) {
    var updateUrl = `/api/todos/${todo.data('id')}`;
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    });
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = `/api/todos/${clickedId}`;

    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
    });
}

function addTodos(todos) {
    // add todos to page
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo(){
    // send request to create new todo
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch(function(err) {
        console.log(err);
    });
}