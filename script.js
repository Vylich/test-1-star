document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    saveTasks();
    taskInput.value = "";
  };

  const createTaskItem = (text) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = text;

    const performButton = document.createElement("button");
    performButton.className = "perform-button";
    performButton.textContent = "Выполнить";
    performButton.addEventListener("click", (e) => {
      e.stopPropagation();
      li.classList.toggle("completed");
      saveTasks();
    });

    li.appendChild(performButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(deleteButton);
    return li;
  };

  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach((item) => {
      tasks.push({
        text: item.textContent
          .replace("Удалить", "")
          .trim()
          .replace("Выполнить", "")
          .trim(),
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task.text);
      if (task.completed) {
        taskItem.classList.add("completed");
      }
      taskList.appendChild(taskItem);
    });
  };

  loadTasks();

  addTaskButton.addEventListener("click", addTask);
});
