// Read UI Elements
const addTask = document.querySelector('#btn1');
const clearTask = document.querySelector('#btn2');
const input = document.querySelector('.input-text');
const filter = document.querySelector('.filter-tasks');
const taskList = document.querySelector('.collection');

// Add Event Listeners
addTask.addEventListener('click', addTaskDetails);
clearTask.addEventListener('click', clearDetails);
taskList.addEventListener('click', deleteItem);
filter.addEventListener('keyup', filterItem);
document.addEventListener('DOMContentLoaded', getTasks);


function addTaskDetails(e) {

    if (input.value === '') {
        window.alert('Please Enter Task');
    }
    else {
        const li = document.createElement('li');
        li.className = 'list-group-item collection-item d-flex justify-content-between align-items';
        li.appendChild(document.createTextNode(input.value));
        const a = document.createElement('a');
        a.className = 'delete-item';
        a.innerHTML = ` <i class="fa fa-remove"></i>`;
        li.appendChild(a);
        document.querySelector('.collection').appendChild(li);
        addTaskInLocalStorage(input.value);
        input.value = '';

    }
    e.preventDefault();
}

function clearDetails(e) {
    if (window.confirm('Are you sure to delete? ')) {
        document.querySelector('.collection').innerHTML = '';
        localStorage.clear();
    }
    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.classList[0] == 'fa') {
        if (window.confirm('Are you sure to delete? ')) {
            e.target.parentElement.parentElement.remove();
            deleteTaskInLocalStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function filterItem(e) {

    const filterText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (item) {
        if (item.textContent.toLowerCase().indexOf(filterText) != -1) {
            item.setAttribute('style', 'display:block');
        }
        else {
            item.setAttribute('style', 'display:none !important');
        }
    })

    e.preventDefault();
}

function addTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'list-group-item collection-item d-flex justify-content-between align-items';
            li.appendChild(document.createTextNode(item));
            const a = document.createElement('a');
            a.className = 'delete-item';
            a.innerHTML = ` <i class="fa fa-remove"></i>`;
            li.appendChild(a);
            document.querySelector('.collection').appendChild(li);
        })
    }

}

function deleteTaskInLocalStorage(deletetask) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {

        if (deletetask === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}