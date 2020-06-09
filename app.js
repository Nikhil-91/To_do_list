// Define Variables
const input = document.querySelector('.input-task');
const btn = document.querySelector('#btn');
const filter = document.querySelector('.filter-task');
const clear = document.querySelector('.clear-task');
const main_card = document.querySelector('#main-card');
const task_form = document.querySelector('.task-form');

loadeventListeners();

//load event listeners
function loadeventListeners() {
    btn.addEventListener('click', addTask);
    main_card.addEventListener('click', deleteTask);
    clear.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', getTasks);
}

function addTask(e) {
    if (input.value == '') {
        alert('Please Enter Task!!!')
    }
    else {
        //create list item and append it to parent element
        const li = document.createElement('li');
        li.className = "list-group-item collection-item d-flex justify-content-between bg-success text-white"
        li.appendChild(document.createTextNode(input.value))
        const a = document.createElement('a')
        a.className = 'delete-item'
        a.innerHTML = `<i class="fa fa-remove"></i>`
        li.appendChild(a)
        document.querySelector('ul.collection').appendChild(li)
        addLocalStorage(input.value);
        input.value = '';
    }

    e.preventDefault();
}

function deleteTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        let val = confirm('Are you sure?')
        if (val) {
            e.target.parentElement.parentElement.remove();
            deleteLocalStorage(e.target.parentElement.parentElement.textContent);
        }
    }
}

function clearTasks(e) {

    // document.querySelector('ul.collection').innerText = '';
    while (document.querySelector('ul.collection').firstChild) {
        document.querySelector('ul.collection').firstChild.remove();
    }
    clearLocalStorage();
}

function filterTasks(e) {
    const item = filter.value;
    document.querySelectorAll('li.collection-item').forEach(element => {
        if (element.firstChild.textContent.toLowerCase().indexOf(item) != -1) {
            element.setAttribute('style', 'display:block');

        }
        else {
            element.setAttribute('style', 'display:none !important');
        }
    });

}

function addLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    AlertMessage('Task Saved successfully', 'success')
    setTimeout(function () {
        clearMessage();
    }, 2000);
}

function getTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach((task_in) => {
            const li = document.createElement('li');
            li.className = "list-group-item collection-item d-flex justify-content-between bg-success text-white"
            li.appendChild(document.createTextNode(task_in))
            const a = document.createElement('a')
            a.className = 'delete-item'
            a.innerHTML = `<i class="fa fa-remove"></i>`
            li.appendChild(a)

            document.querySelector('ul.collection').appendChild(li)
        })

    }


}

function deleteLocalStorage(task_input) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (task == task_input) {
            tasks.splice(index, 1)
        }
    })

    tasks.push(localStorage.setItem('tasks', tasks))
    AlertMessage('Task deleted successfully', 'danger')
    setTimeout(function () {
        clearMessage();
    }, 2000);
}

function clearLocalStorage() {
    localStorage.clear()
}


function AlertMessage(msg, className) {
    let alert = document.createElement('div');
    alert.className = `alert alert-${className}`;
    alert.appendChild(document.createTextNode(msg));
    task_form.insertBefore(alert, input);
}

function clearMessage() {
    document.querySelector('.alert').remove()
}

