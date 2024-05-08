document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const input = document.getElementById('todo-input');
    const newTaskText = input.value.trim();
    if (newTaskText !== "") {
        const list = document.getElementById('todo-list');
        addTaskToList(newTaskText);
        input.value = ""; 
        saveTasks();
    } else {
        alert("Please enter a task.");
    }
}

function addTaskToList(text) {
    const list = document.getElementById('todo-list');
    const newTask = document.createElement('li');
    newTask.textContent = text;
    newTask.addEventListener('click', () => toggleComplete(newTask));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        newTask.remove();
        saveTasks();
    };

    newTask.appendChild(deleteBtn);
    list.appendChild(newTask);
}

function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(taskItem => {
        const task = {
            text: taskItem.textContent.replace('×', '').trim(),
            completed: taskItem.classList.contains('completed')
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTaskToList(task.text);
            if (task.completed) {
                const list = document.getElementById('todo-list');
                list.lastChild.classList.add('completed');
            }
        });
    }
}
