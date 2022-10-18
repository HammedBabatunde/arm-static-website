const todoItem = document.querySelector('#itemInput');
const form = document.querySelector('#itemForm');
const clearButton = document.querySelector('#clear-list');
const taskList = document.querySelector('.item-list');


// Load all event listeners 
loadEventListeners();

// Create the loadEvent listeners function
function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add list
    form.addEventListener('submit', addTask);

    
    taskList.addEventListener('click', removeTask);

    // clear Tasks 
    clearButton.addEventListener('click', clearTask);

    //edit tasks
    taskList.addEventListener('click', editTask);

    // complete tasks
    taskList.addEventListener('click', completeTask);
}


// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task) {
        // create a div element
        const div = document.createElement('div');

        //create li classNames 
        div.className = 'item my-3';

        // create h5 element
        const h5 = document.createElement('h5');

        // create h5 classNames 
        h5.className = 'item-name text-capitalize';

        // append text to h5
        h5.appendChild(document.createTextNode(task));

        // create icon div
        const iconDiv = document.createElement('div');

        //create complete anchor element
        const completelink = document.createElement('a');

        // create complete anchor class name 
        completelink.className = 'complete-item mx-2 item-icon';

        // create complete inner html 
        completelink.innerHTML = '<i class="far fa-check-circle"></i>';

        //create edit anchor element;
        const editlink = document.createElement('a');

        // create edit anchor class name 
        editlink.className = 'edit-item mx-2 item-icon';
    
        // create edit inner html 
        editlink.innerHTML = '<i class="far fa-edit"></i>';

        //create delete anchor element
        const deletelink = document.createElement('a');

        // create delete anchor class name 
        deletelink.className = 'delete-item item-icon';
    
        // create delete inner html 
        deletelink.innerHTML = '<i class="far fa-times-circle"></i>';


        // appending anchor tags
        iconDiv.appendChild(completelink);
        iconDiv.appendChild(editlink);
        iconDiv.appendChild(deletelink);

        // appending iconDiv and h5 to to single li 
        div.appendChild(h5);
        div.appendChild(iconDiv);

        //append li div to list div
        taskList.appendChild(div);
    })
}

// create Tasks
function addTask(e) {
    //clear default form submission
    e.preventDefault();

    if(todoItem.value === '') {
        showError();
    }

    // create a div element
    const div = document.createElement('div');

    //create li classNames 
    div.className = 'item my-3';

    // create h5 element
    const h5 = document.createElement('h5');

    // create h5 classNames 
    h5.className = 'item-name text-capitalize';

    // append text to h5
    h5.appendChild(document.createTextNode(todoItem.value));

    // create icon div
    const iconDiv = document.createElement('div');

    //create complete anchor element
    const completelink = document.createElement('a');

    // create complete anchor class name 
    completelink.className = 'complete-item mx-2 item-icon';

    // create complete inner html 
    completelink.innerHTML = '<i class="far fa-check-circle"></i>';

     //create edit anchor element;
    const editlink = document.createElement('a');

     // create edit anchor class name 
    editlink.className = 'edit-item mx-2 item-icon';
 
    // create edit inner html 
    editlink.innerHTML = '<i class="far fa-edit"></i>';

    //create delete anchor element
    const deletelink = document.createElement('a');

     // create delete anchor class name 
    deletelink.className = 'delete-item item-icon';
 
    // create delete inner html 
    deletelink.innerHTML = '<i class="far fa-times-circle"></i>';


    // appending anchor tags
    iconDiv.appendChild(completelink);
    iconDiv.appendChild(editlink);
    iconDiv.appendChild(deletelink);

    // appending iconDiv and h5 to to single li 
    div.appendChild(h5);
    div.appendChild(iconDiv);

    //append li div to list div
    taskList.appendChild(div);

    // Strore in Local Storage 
    storeTaskInLocalStorage(todoItem.value);
    
    // clear text Input
    todoItem.value ='';

}

// store Tasks
function storeTaskInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// show Error function 
function showError() {
    errorDiv = document.querySelector('.feedback');

    errorDiv.classList.add('alert-danger')

    errorDiv.style.display = 'block';

    setTimeout(clearError, 2000);

}

function clearError() {
    errorDiv.style.display = 'none';
}

// Remove task Task function 
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.parentElement.remove();
    }

    // Remove Task from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement) 
}

function removeTaskFromLocalStorage(taskItem) {
    
}


// Clear Task function 
function clearTask() {
    // using while loop 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from ls 
    clearTasksFromLocalStorage();
}

// clear Task from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// edit Task function
function editTask (e) {
    if(e.target.parentElement.classList.contains('edit-item')) {
        const editText = e.target.parentElement.parentElement.parentElement.firstChild.textContent;
        e.target.parentElement.parentElement.parentElement.remove();
        todoItem.value = editText;
    }
}

// complete function 
function completeTask (e) {
    if(e.target.parentElement.classList.contains('complete-item')) {
        if(e.target.parentElement.classList.contains('visibility')) {
            e.target.parentElement.classList.remove('visibility');
            e.target.parentElement.parentElement.previousElementSibling.classList.remove('completed');
        } else {
            e.target.parentElement.classList.add('visibility');
            e.target.parentElement.parentElement.previousElementSibling.classList.add('completed');
        }
    }
}

