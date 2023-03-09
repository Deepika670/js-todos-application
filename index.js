let todoItemsContainer = document.getElementById("todoItemsContainer");

// let todoList = [
//   { text: "Learn HTML", uniqueNo: 1 },
//   { text: "Learn CSS", uniqueNo: 2 },
//   { text: "Learn JavaScript", uniqueNo: 3 },
// ];

let saveTodoButton = document.getElementById("saveTodoButton");
saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

todoList = getTodoListFromLocalStorage();

let todoCount = todoList.length;
function onToDoStatusChanged(checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  console.log(labelElement);
  // if (checkboxElement.checked === true) {
  //   labelElement.classList.add("checked");
  // } else {
  //   labelElement.classList.remove("checked");
  // }
  labelElement.classList.toggle("checked");
}
function onDeleteToDo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deletedTodoItemIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + todoElement.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-element-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  console.log(todoItemsContainer);
  let inputElement = document.createElement("input");
  inputElement.id = checkboxId;
  inputElement.type = "checkbox";
  inputElement.classList.add("checkbox-input");

  inputElement.onclick = function () {
    onToDoStatusChanged(checkboxId, labelId);
  };

  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);
  // console.log(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelElement.id = labelId;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    onDeleteToDo(todoId);
  };
  deleteIconContainer.appendChild(deleteIcon);
}

// createAndAppendTodo(todoList[0]);
// createAndAppendTodo(todoList[1]);
// createAndAppendTodo(todoList[2]);

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
function onAddToDo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;
  if (userInputValue === "") {
    alert("Enter valid text");
    return;
  }
  todoCount += 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todoCount,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

let addToDoButton = document.getElementById("addToDoButton");
addToDoButton.onclick = function () {
  onAddToDo();
};
