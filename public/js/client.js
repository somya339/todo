// Selectors
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
console.log("hello");
// Event listeners

// Tasks array
let tasks = [];
let updateTarget;

// Fetch task
window.addEventListener("DOMContentLoaded", () => {
    fetchTask();
});
const fetchTask = () => {
    console.log("heer");
    fetch("http://localhost:3000/", {
        method: "post",
    })
        .then((res) => {
            console.log(res);
            res.json().then((data) => {
                if (data) {
                    tasks = [];
                    data.forEach((e) => {
                        tasks.push(e);
                    });
                    renderTasks();
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Add task

const addTask = (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
        };
        fetch("http://localhost:3000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
            .then((res) => {
                console.log(res);
                res.json((data) => {
                    console.log(data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        tasks.push(task);
        renderTasks();
        taskInput.value = "";
    }
};

// Delete task
const deleteTask = (e) => {
    if (e) {
        const taskId = e.getAttribute("data-task-id");
        console.log(taskId);
        fetch("http://localhost:3000/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: taskId }),
        }).then((res) => {
            if (res.status === 200) {
                console.log(tasks);
                fetchTask();
            } else {
                return;
            }
        });
    }
};

// Update Task

const updateTask = (target, text) => {
    if (text !== "") {
        const task = {
            id: target,
            text: text,
        };
        fetch("http://localhost:3000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
            .then((res) => {
                console.log(res);
                fetchTask();
                res.json((data) => {
                    console.log(data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
const getNewTask = () => {
    const text = document.getElementById("update-task").value;
    updateTask(updateTarget, text);
};

// Render tasks
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("todo-item");
        taskItem.setAttribute("data-task-id", task.id);
        taskItem.innerHTML = `
        <div>
        <input type="checkbox" class="check-task">
        <span>${task.text}</span>
        </div>
        <div>
        <button class="update-btn" data-bs-toggle="modal" data-bs-target="#modalId">Update</button>
        <button class="delete-btn">Delete</button>
        </div>
        `;
        taskList.appendChild(taskItem);
    });
    // document.querySelectorAll('.check-task').forEach(e =>{
    //     e.addEventListener("click" , event =>{
    //         if(event.target.checked){

    //         }
    //     })
    // })
    document.querySelectorAll(".delete-btn").forEach((e) => {
        e.addEventListener("click", (event) => {
            deleteTask(event.target.parentNode.parentNode);
        });
    });
    document.querySelectorAll(".update-btn").forEach((e) => {
        e.addEventListener("click", (event) => {
            updateTarget = event.target.parentNode.parentNode.getAttribute("data-task-id");
        });
    });
};

todoForm.addEventListener("submit", addTask);
