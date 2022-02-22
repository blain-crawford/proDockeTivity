'strict';
import './styles.css';

class ToDoItem {
  constructor(title, notes, deadLine, priority, project = null) {
    this.title = title;
    this.notes = notes;
    this.deadLine = deadLine;
    this.priority = priority;
    this.project = project;
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

const addToDoListItemToThingsToDo = (list) => {
  clearThingsToDoBeforeRepopulation();
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
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

      toDoDiv.id = toDoContainer.childElementCount;
      toDoDiv.classList.add('todo');
      checkBoxAndTitle.classList.add('checkbox-and-title');
      checkBox.classList.add('fa-regular', 'fa-square', 'fa-lg');
      dateIconsForEditing.classList.add('date-icons-for-editing');
      editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'fa-lg');
      infoSymbol.classList.add('fa-solid', 'fa-circle-info', 'fa-lg');
      trashCan.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');
      
      numberOfTodos.innerText = `(${toDoContainer.childElementCount + 1})`
      toDoDivTitle.innerText = list[i].title;
      toDoDate.innerText = list[i].deadLine;
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
  const currentProject = document.querySelector('#current-project')
  let selectedProject = null;
  

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

  const rePopulateArray = (arrayToPopulate, toDoObject) => {
    if (arrayToPopulate.length > 0) {
      while (arrayToPopulate.length > 0) {
        arrayToPopulate.pop();
      }
    }

    for (const toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string') {
        let currentToDo = JSON.parse(toDoObject[toDo])
        arrayToPopulate.push(currentToDo);
      }
    }
  };

  const createToDoItem = function () {
    if(currentProject.textContent !== 'All' 
    && currentProject.textContent !== 'Week' 
    && currentProject.textContent !== 'Month'
    && currentProject.textContent !== 'Most Important' 
    && currentProject.textContent !== 'Completed'
    ) {
      selectedProject = currentProject.textContent;
    }

    const toDo = new ToDoItem(
      titleInput.value,
      notesInput.value,
      deadLineInput.value,
      priorityInput.value,
      selectedProject
    );

    clearToDoForm();
    closeForm();
    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem(toDo.title)) {
        localStorage.setItem(`${toDo.title}`, JSON.stringify(toDo));
        rePopulateArray(toDoList, localStorage);
        addToDoListItemToThingsToDo(toDoList);
        console.log(toDoList);
      }
    } else {
      alert('There is no local Storage here!');
    }
  };

  formClosingButton.addEventListener('click', closeForm, false);
  addToDoButton.addEventListener('click', openTodoForm, false);
  toDoAddButton.addEventListener('click', createToDoItem, false);

  return { toDoList, rePopulateArray };
})();

export { toDoForm, toDoList, addToDoListItemToThingsToDo };

