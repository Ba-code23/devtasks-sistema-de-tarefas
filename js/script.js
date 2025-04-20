const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");
const logoutBtn = document.getElementById("logoutBtn");
const toggleTheme = document.getElementById("toggleTheme");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const doneTasks = document.getElementById("doneTasks");

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
const user = localStorage.getItem("devtasks_user");
if (user) {
loginScreen.classList.add("hidden");
app.classList.remove("hidden");
loadTasks();
}
const theme = localStorage.getItem("theme");
if (theme === "light") {
document.body.classList.add("light");
toggleTheme.textContent = "Modo Escuro";
}
});

loginBtn.addEventListener("click", () => {
const username = usernameInput.value.trim();
if (username !== "") {
localStorage.setItem("devtasks_user", username);
loginScreen.classList.add("hidden");
app.classList.remove("hidden");
loadTasks();
}
});

logoutBtn.addEventListener("click", () => {
localStorage.removeItem("devtasks_user");
localStorage.removeItem("devtasks_data");
location.reload();
});

toggleTheme.addEventListener("click", () => {
document.body.classList.toggle("light");
const isLight = document.body.classList.contains("light");
toggleTheme.textContent = isLight ? "Modo Escuro" : "Modo Claro";
localStorage.setItem("theme", isLight ? "light" : "dark");
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
const text = taskInput.value.trim();
if (text !== "") {
tasks.push({ text, done: false });
taskInput.value = "";
saveTasks();
renderTasks();
}
}

function toggleDone(index) {
tasks[index].done = !tasks[index].done;
saveTasks();
renderTasks();
}

function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}

function renderTasks() {
taskList.innerHTML = "";
let doneCount = 0;

tasks.forEach((task, index) => {
const div = document.createElement("div");
div.className = `task-item ${task.done ? "done" : ""}`;
div.innerHTML = `
<span>${task.text}</span>
<div class="task-buttons">
<button onclick="toggleDone(${index})">${task.done ? "Desfazer" : "Concluir"}</button>
<button onclick="deleteTask(${index})">Excluir</button>
</div>
`;
taskList.appendChild(div);
if (task.done) doneCount++;
});

totalTasks.textContent = tasks.length;
doneTasks.textContent = doneCount;
}

function saveTasks() {
localStorage.setItem("devtasks_data", JSON.stringify(tasks));
}

function loadTasks() {
const saved = localStorage.getItem("devtasks_data");
if (saved) {
tasks = JSON.parse(saved);
}
renderTasks();
}