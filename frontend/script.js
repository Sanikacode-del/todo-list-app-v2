const apiUrl = "http://localhost:3000/tasks";

async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.name;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: task })
  });

  input.value = "";
  fetchTasks(); // Reload tasks
}

window.onload = fetchTasks;