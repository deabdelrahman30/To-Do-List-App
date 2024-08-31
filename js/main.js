let tasks = [
  {
    title: "قراءة كتاب",
    date: "2020/10/15",
    done: false,
  },
  {
    title: "إنهاء كورس",
    date: "2020/11/12",
    done: true,
  },
  {
    title: "تطبيق مشروع",
    date: "2020/11/14",
    done: false,
  },
];

function getTasksFromStorage() {
  let gettedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = gettedTasks ?? []; // tasks = gettedTasks Or Empty Array
}

getTasksFromStorage();

function fillTasks() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (let task of tasks) {
    document.getElementById("tasks").innerHTML += `
      <div class="task ${task.done ? "isDone" : ""}">
        <div class="task-info">
          <h2>${task.title}</h2>
          <div>
            <span>
              <i class="fa-regular fa-calendar-days"></i>
              ${task.date}
            </span>
          </div>
        </div>
        <div class="task-options">
          <button class="circular edit" onclick="editTask(${index})">
            <i class="fa-solid fa-pen"></i>
          </button>
          ${
            task.done
              ? `<button class="circular cancel" onclick="toggleTaskState(${index})">
                  <i class="fa-regular fa-circle-xmark"></i>
                </button>`
              : `<button class="circular done" onclick="toggleTaskState(${index})">
                  <i class="fa-solid fa-check"></i>
                </button>`
          }
          
          <button class="circular remove" onclick="removeTask(${index})">
            <i class="fa-solid fa-trash fa-1x"></i>
          </button>
        </div>
      </div>    
    `;
    index++;
  }
}

fillTasks();

document.getElementById("add").addEventListener("click", function () {
  let date = new Date();
  let now = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} . ${date.getMinutes()} : ${date.getHours()}`;
  let taskTitle = prompt("أدخل عنوان المهمة");
  if (taskTitle !== null && taskTitle !== "") {
    let taskObj = {
      title: taskTitle,
      date: now,
      done: false,
    };
    tasks.push(taskObj);
    storeTasks();
    fillTasks();
  }
});

function editTask(index) {
  let newTitle = tasks[index];
  let editTitle = prompt("برجاء إدخال إسم المهمة الجديد", newTitle.title);
  if (editTitle !== null && editTitle !== "") {
    newTitle.title = editTitle;
    storeTasks();
    fillTasks();
  }
}

function toggleTaskState(index) {
  let taskState = tasks[index];
  taskState.done = !taskState.done;
  storeTasks();
  fillTasks();
}

function removeTask(index) {
  let taskTitle = tasks[index];
  let confirmMsg = confirm(`هل انت متأكد من حذف ${taskTitle.title}`);
  if (confirmMsg) {
    tasks.splice(index, 1);
    storeTasks();
    fillTasks();
  }
}

function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}
