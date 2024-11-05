const taskForm = document.querySelector(".task-form");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const pendingTasksList = document.getElementById("pendingTasksList");
const completedTasksList = document.getElementById("completedTasksList");

let tasks = [];

document.getElementById("saveTask").addEventListener("click", function (e) {
  e.preventDefault();
  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
    isCompleted: false,
  };
  tasks.push(newTask);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
      <span>${task.title}: ${task.description}</span>
      <div class="task-buttons">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        ${!task.isCompleted ? `<button class="complete-btn" onclick="completeTask(${index})">Complete</button>` : ""}
      </div>
    `;

    if (task.isCompleted) {
      taskItem.classList.add("completed");
      completedTasksList.appendChild(taskItem);
    } else {
      pendingTasksList.appendChild(taskItem);
    }
  });
}

function completeTask(index) {
  tasks[index].isCompleted = true;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  taskTitle.value = task.title;
  taskDescription.value = task.description;
  deleteTask(index); // Delete to avoid duplicate entries
}
