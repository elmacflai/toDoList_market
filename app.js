let input = document.querySelector("#input");
let inputButton = document.querySelector("#inputButton");
let itemsList = document.querySelector(".itemsList");
let deleteButtons;
let doneButtons;

let toDoList = [];

const renderNewItems = () => {
  itemsList.innerHTML = toDoList.join("");
  deleteItem();
  MarkToDoAsDone();
};

const addNewItems = () => {
  toDoList.push(`
    <li class="toDoContainer">
    <span >${input.value}</span>
    <div class="buttonsContainer"> <button id="done">Done</button>
        <button id="delete">delete</button></div>
    </li>`);
  input.value = "";
  renderNewItems();
};

const deleteItem = () => {
  deleteButtons = document.querySelectorAll("#delete");

  //Add event listener to the new delete buttons
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      toDoList = toDoList.filter((toDo) => {
        return toDo !== toDoList[i];
      });
      //Render the latest toDo items
      renderNewItems();
    });
  }
};

const MarkToDoAsDone = () => {
  doneButtons = document.querySelectorAll("#done");

  // Add Event listener to the new done buttons
  for (let i = 0; i < doneButtons.length; i++) {
    doneButtons[i].addEventListener("click", () => {
      toDoList = toDoList.map((toDo) => {
        if (toDo === toDoList[i]) {
          let pattern = /(<span\b[^>]*>)/;
          let replacement = '<span style="text-decoration: line-through">';

          toDo = toDo.replace(pattern, replacement);
        }
        return toDo;
      });
      //Render the latest toDo items
      renderNewItems();
    });
  }
};

inputButton.addEventListener("click", () => {
  addNewItems();
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewItems();
  }
});