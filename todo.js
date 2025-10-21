let tasks = [];
let currentFilter = 'all';

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function filterTasks(filter, event) {
    currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderTasks();
}

function getFilteredTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function renderTasks() {
    const todoList = document.getElementById('todoList');
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
    } else {
        todoList.innerHTML = filteredTasks.map(task => `
            <li class="todo-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="todo-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </li>
        `).join('');
    }

    updateStats();
}

renderTasks();
