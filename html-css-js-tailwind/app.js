const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');

let todos = [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoItem(e) {
    const button = e.target;
    const li = button.parentElement;
    const liId = parseInt(li.id);

    todos = todos.filter(todo => todo.id !== liId);
    li.remove();
    saveTodos();
}

function addTodoItem() {
    const todoText = todoInput.value;
    if (todoText === '') return;

    const todo = {
        id: Date.now(),
        text: todoText
    };

    todos.push(todo);
    todoInput.value = '';

    const li = document.createElement('li');
    li.id = todo.id;
    li.innerText = todo.text;
    li.classList.add('py-1');
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-400', 'ml-3');
    button.addEventListener('click', deleteTodoItem);
    li.appendChild(button);

    todoList.appendChild(li);
    saveTodos();
}

todoForm.addEventListener('submit', e => {
    e.preventDefault();
    addTodoItem();
});

const savedTodos = localStorage.getItem('todos');
if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.id = todo.id;
        li.innerText = todo.text;
        li.classList.add('py-1');
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-400', 'ml-3');
        button.addEventListener('click', deleteTodoItem);
        li.appendChild(button);

        todoList.appendChild(li);
    });
}