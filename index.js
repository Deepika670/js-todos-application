let todoItemsContainer = document.getElementById("todoItemsContainer");

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
function onToDoStatusChanged(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  console.log(labelElement);
  labelElement.classList.toggle("checked");

  let todoItemIndex = todoList.findIndex(function (eachTodoItem) {
    let eachTodoId = "todo" + eachTodoItem.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  let todoObject = todoList[todoItemIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
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
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");

  inputElement.onclick = function () {
    onToDoStatusChanged(checkboxId, labelId, todoId);
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

  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }

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
    isChecked: false,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

let addToDoButton = document.getElementById("addToDoButton");
addToDoButton.onclick = function () {
  onAddToDo();
};
