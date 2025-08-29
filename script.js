let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = -1;

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (editingIndex >= 0) {
    tasks[editingIndex] = {
      ...tasks[editingIndex],
      title,
      description,
      priority,
      dueDate
    };
    editingIndex = -1;
  } else {
    tasks.push({
      title,
      description,
      priority,
      dueDate,
      completed: false
    });
  }

  taskForm.reset();
  saveAndRender();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <strong>${task.title}</strong><br/>
      ${task.description ? `<em>${task.description}</em><br/>` : ""}
      Priority: ${task.priority} | Due: ${task.dueDate || "N/A"}<br/>

      <div class="task-actions">
        <button onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("priority").value = task.priority;
  document.getElementById("dueDate").value = task.dueDate;
  editingIndex = index;
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
