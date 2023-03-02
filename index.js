let todoItemsContainer = document.getElementById("todoItemsContainer");

let todoElement = document.createElement("li");
todoElement.classList.add("todo-element-container", "d-flex", "flex-row");
todoItemsContainer.appendChild(todoElement);

console.log(todoItemsContainer);
let inputElement = document.createElement("input");
inputElement.id = "checkboxInput";
inputElement.type = "checkbox";
inputElement.classList.add("checkbox-input");
todoElement.appendChild(inputElement);

let labelContainer = document.createElement("div");
labelContainer.classList.add("label-container", "d-flex", "flex-row");
todoElement.appendChild(labelContainer);
// console.log(labelContainer);

let labelElement = document.createElement("label");
labelElement.setAttribute("for", "checkboxInput");
labelElement.classList.add("checkbox-label");
labelElement.textContent = "Learn HTML";
labelContainer.appendChild(labelElement);

let deleteIconContainer = document.createElement("div");
deleteIconContainer.classList.add("delete-icon-container");
labelContainer.appendChild(deleteIconContainer);

let deleteIcon = document.createElement("i");
deleteIcon.classList.add("fa", "fa-trash-alt", "delete-icon");
deleteIconContainer.appendChild(deleteIcon);
