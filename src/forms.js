'strict';
import './styles.css';

class ToDoItem {
  constructor(title, notes, deadLine, priority, project) {
    this.title = title;
    this.notes = notes;
    this.deadLine = deadLine;
    this.priority = priority;
    // this.project = project.id
    this.id = localStorage.length;
  }
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (
        e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )(storage && storage.length !== 0)
    );
  }
}

const clearThingsToDoBeforeRepopulation = () => {
  const toDoContainer = document.querySelector('#todo-container');
  toDoContainer.innerHTML = '';
};

const addToDoListItemToThingsToDo = () => {
  clearThingsToDoBeforeRepopulation();
  if (toDoList.length > 0) {
    for (let i = 0; i < toDoList.length; i++) {
      const toDoContainer = document.querySelector('#todo-container');
      const checkBoxAndTitle = document.createElement('div');
      const toDoDiv = document.createElement('div');
      const checkBox = document.createElement('i');
      const toDoDivTitle = document.createElement('p');
      const dateIconsForEditing = document.createElement('div');
      const toDoDate = document.createElement('p');
      const editSymbol = document.createElement('i');
      const infoSymbol = document.createElement('i');
      const trashCan = document.createElement('i');
      const numberOfTodos = document.querySelector('#number-of-todos');
  
      console.log(toDoContainer.childElementCount);

      toDoDiv.id = toDoContainer.childElementCount;
      toDoDiv.classList.add('todo');
      checkBoxAndTitle.classList.add('checkbox-and-title');
      checkBox.classList.add('fa-regular', 'fa-square', 'fa-lg');
      dateIconsForEditing.classList.add('date-icons-for-editing');
      editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'fa-lg');
      infoSymbol.classList.add('fa-solid', 'fa-circle-info', 'fa-lg');
      trashCan.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');

      numberOfTodos.innerText = `(${toDoContainer.childElementCount + 1})`
      toDoDivTitle.innerText = toDoList[i].title;
      toDoDate.innerText = toDoList[i].deadLine;
      checkBoxAndTitle.appendChild(checkBox);
      checkBoxAndTitle.appendChild(toDoDivTitle);
      toDoDiv.appendChild(checkBoxAndTitle);
      dateIconsForEditing.appendChild(toDoDate);
      dateIconsForEditing.appendChild(editSymbol);
      dateIconsForEditing.appendChild(infoSymbol);
      dateIconsForEditing.appendChild(trashCan);
      toDoDiv.appendChild(dateIconsForEditing);
      toDoContainer.appendChild(toDoDiv);
    }
  }
};

const toDoList = [];

const toDoForm = (() => {
  const pageBody = document.querySelector('#page-body');
  const pageHeader = document.querySelector('#page-header');
  const formClosingButton = document.querySelector('#closing-button');
  const addToDoButton = document.querySelector('#add-todo');
  const toDoForm = document.querySelector('#todo-form');
  const titleInput = document.querySelector('#title-input');
  const notesInput = document.querySelector('#notes-input');
  const deadLineInput = document.querySelector('#deadline-input');
  const priorityInput = document.querySelector('#priority-input');
  const toDoAddButton = document.getElementById('add');

  const closeForm = () => {
    toDoForm.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  const openTodoForm = () => {
    toDoForm.classList.remove('invisible');
    pageBody.classList.add('tint');
    pageHeader.classList.add('tint');
  };

  const clearToDoForm = () => {
    titleInput.value = '';
    notesInput.value = '';
    deadLineInput.value = 'MM-dd-yyyy';
    priorityInput.value = 'Please Choose One';
  };

  const rePopulateToDoArray = (object) => {
    if (toDoList.length > 0) {
      while (toDoList.length > 0) {
        toDoList.pop();
      }
    }

    for (const toDo in object) {
      if (typeof object[toDo] === 'string') {
        toDoList.push(JSON.parse(object[toDo]));
      }
    }
    return { rePopulateToDoArray };
  };

  const createToDoItem = function () {
    const toDo = new ToDoItem(
      titleInput.value,
      notesInput.value,
      deadLineInput.value,
      priorityInput.value
    );
    clearToDoForm();
    closeForm();
    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem(toDo.title)) {
        localStorage.setItem(`${toDo.title}`, JSON.stringify(toDo));
        rePopulateToDoArray(localStorage);
        addToDoListItemToThingsToDo();
        console.log(toDoList);
      }
    } else {
      alert('There is no local Storage here!');
    }
  };

  formClosingButton.addEventListener('click', closeForm, false);
  addToDoButton.addEventListener('click', openTodoForm, false);
  toDoAddButton.addEventListener('click', createToDoItem, false);

  return { toDoList, rePopulateToDoArray };
})();

export { toDoForm, toDoList, addToDoListItemToThingsToDo };

// if(localStorage.getItem('toDoList')) {
//   localStorage.removeItem('toDoList');
//   localStorage.setItem(`toDoList`, JSON.stringify(toDoList))
//   console.log(localStorage.length)
// } else {
//   localStorage.setItem('toDoList', JSON.stringify(toDoList));
// }
