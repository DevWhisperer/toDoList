let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  enterkey(event);
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click", (event) =>
    IndicatorMove(event.currentTarget)
  );
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function addTask() {
  if (taskInput.value == "") {
    alert("입력해주세요");
    return;
  }
  let task = {
    id: randomGenerateID(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  if (mode == "all") {
    showList = taskList;
  } else {
    showList = filterList;
  }
  for (let i = 0; i < showList.length; i++) {
    if (showList[i].isComplete == true) {
      resultHTML += `
    <div class="task">
        <div class="task-done">${showList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${showList[i].id}')">Check</button>
                <button onclick="deleteTask('${showList[i].id}')">Delete</button>
            </div>
        </div>
`;
    } else {
      resultHTML += `
    <div class="task">
        <div>${showList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${showList[i].id}')">Check</button>
                <button onclick="deleteTask('${showList[i].id}')">Delete</button>
            </div>
        </div>
`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
    }
  }
  render();
}

function randomGenerateID() {
  return ("000000000" + Math.random().toString(36).substr(2, 9)).slice(-9);
}

function enterkey(event) {
  if (event.keyCode == 13) {
    addTask();
  }
}

function IndicatorMove(e) {
  underLine.style.left = e.offsetLeft + "px";
  underLine.style.width = e.offsetWidth + "px";
  underLine.style.top = e.offsetTop + e.offsetHeight + "px";
}
