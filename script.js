document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text");
  const inputButton = document.getElementById("button");
  const todiList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => {
    renderTask(t);
  });

  inputButton.addEventListener("click", () => {
    const input = inputText.value.trim();

    if (!input) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    inputText.value = "";

    console.log(newTask);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      console.log("A");
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    todiList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
