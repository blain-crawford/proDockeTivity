'strict';
import './styles.css';
import { projectInteraction, Project } from './projects.js';
const pageBody = document.querySelector('#page-body');
const pageHeader = document.querySelector('#page-header');

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



const toDoList = [];

const generalFormFunction = (() => {
  const clearForm = (title, notes = null, deadLine = null, priority = null) => {
    title.value = '';
    notes.value = '';
    deadLine.value = 'MM-dd-yyyy';
    priority.value = 'Please Choose One';
  };

  const closeForm = (form, title, notes = null, deadLine = null, priority = null) => {
    clearForm(title, notes, deadLine, priority)
    form.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  const openForm = (form) => {
    form.classList.remove('invisible');
    pageBody.classList.add('tint');
    pageHeader.classList.add('tint');
  };
  return {clearForm, closeForm, openForm}
})();

const toDoForm = (() => {

  const toDoformClosingButton = document.querySelector('#closing-button');
  const addToDoButton = document.querySelector('#add-todo');
  const toDoForm = document.querySelector('#todo-form');
  const titleInput = document.querySelector('#title-input');
  const notesInput = document.querySelector('#notes-input');
  const deadLineInput = document.querySelector('#deadline-input');
  const priorityInput = document.querySelector('#priority-input');
  const toDoAddButton = document.getElementById('add');
  const currentProject = document.querySelector('#current-project');
  const cancelButton = document.querySelector('#cancel');
  let selectedProject = null;

  const addToDoListItemToThingsToDo = (list) => {
    clearThingsToDoBeforeRepopulation();
  
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        //create elements for DOM
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
  
        //style elements
        toDoDiv.id = toDoContainer.childElementCount;
        toDoDiv.classList.add('todo');
        checkBoxAndTitle.classList.add('checkbox-and-title');
        checkBox.classList.add('fa-regular', 'fa-square', 'fa-lg');
        dateIconsForEditing.classList.add('date-icons-for-editing');
        editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'fa-lg');
        infoSymbol.classList.add('fa-solid', 'fa-circle-info', 'fa-lg');
        trashCan.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');
        numberOfTodos.innerText = `(${toDoContainer.childElementCount + 1})`;
        toDoDivTitle.innerText = list[i].title;
        toDoDate.innerText = list[i].deadLine;
  
        //add elements to DOM
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


  const closeToDoForm = function () {
    generalFormFunction.closeForm(toDoForm, titleInput, notesInput,deadLineInput, priorityInput);
  }


  const openToDoForm = () => {
    generalFormFunction.openForm(toDoForm);
  };


  const rePopulateArray = (arrayToPopulate, toDoObject) => {
    if (arrayToPopulate.length > 0) {
      while (arrayToPopulate.length > 0) {
        arrayToPopulate.pop();
      }
    }

    for (const toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string') {
        let currentToDo = JSON.parse(toDoObject[toDo]);
        arrayToPopulate.push(currentToDo);
      }
    }
  };

  const createToDoItem = function () {
    if (
      currentProject.textContent !== 'All' &&
      currentProject.textContent !== 'Week' &&
      currentProject.textContent !== 'Month' &&
      currentProject.textContent !== 'Most Important' &&
      currentProject.textContent !== 'Completed'
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

    
    generalFormFunction.clearForm(titleInput, notesInput, deadLineInput, priorityInput);

    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem(toDo.title)) {
        localStorage.setItem(`${toDo.title}`, JSON.stringify(toDo));
        rePopulateArray(toDoList, localStorage);
        if (
          currentProject.textContent === 'All' ||
          currentProject.textContent === 'Week' ||
          currentProject.textContent === 'Month' ||
          currentProject.textContent === 'Most Important' ||
          currentProject.textContent === 'Completed'
        ) {
          addToDoListItemToThingsToDo(toDoList);
        } else {
          projectInteractions.createProjectOrganizers();

          for (let i = 0; i < projectInteractions.projectsArray.length; i++) {
            let individualProject = projectInteractions.projectsArray[i];

            if (individualProject.title === currentProject.innerText) {
              addToDoListItemToThingsToDo(individualProject.projectContainer);
            }
          }
        }
      } else {
        alert('There is no local Storage here!');
      }
    }
  };

  toDoformClosingButton.addEventListener('click', closeToDoForm, false);
  addToDoButton.addEventListener('click', openToDoForm, false);
  toDoAddButton.addEventListener('click', createToDoItem, false);
  cancelButton.addEventListener('click', closeToDoForm, false);

  return { toDoList, rePopulateArray, addToDoListItemToThingsToDo };
})();

const projectForm = (() => {
  const addProjectButton = document.querySelector('#add-project');
  const projectForm = document.querySelector('#project-form');


})(); 

export { toDoForm, toDoList, generalFormFunction, projectForm };
