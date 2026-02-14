// Select elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('list');
const clearBtn = document.getElementById('clear-btn');
const tabs = document.querySelectorAll('.tab');

// State
let tasks = [];
let currentCategory = 'Personal';

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
taskList.addEventListener('click', handleListClick);
clearBtn.addEventListener('click', clearCompleted);
tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

// Functions
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        category: currentCategory
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => task.category === currentCategory);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <i class="fa-regular fa-circle check-icon" data-id="${task.id}"></i>
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;

        // Update icon if completed
        if (task.completed) {
            const icon = li.querySelector('.check-icon');
            icon.classList.remove('fa-regular', 'fa-circle');
            icon.classList.add('fa-solid', 'fa-circle-check');
        }

        taskList.appendChild(li);
    });
}

function handleListClick(e) {
    const target = e.target;

    // Check/Uncheck
    if (target.classList.contains('check-icon')) {
        const id = parseInt(target.getAttribute('data-id'));
        toggleTask(id);
    }

    // Delete
    if (target.closest('.delete-btn')) {
        const id = parseInt(target.closest('.delete-btn').getAttribute('data-id'));
        deleteTask(id);
    }
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function clearCompleted() {
    // Only clear completed tasks in the CURRENT category
    tasks = tasks.filter(task => !(task.completed && task.category === currentCategory));
    renderTasks();
}

function handleTabClick(e) {
    tabs.forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');

    currentCategory = e.target.innerText;
    renderTasks();
}

// Initial Render
renderTasks();