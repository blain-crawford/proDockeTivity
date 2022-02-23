'strict';
import './styles.css';
import { projectInteractions, Project } from './projects.js';
import { secondsToMilliseconds } from 'date-fns';
import { storageAvailable } from './index.js'
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

const clearThingsToDoBeforeRepopulation = () => {
  const toDoContainer = document.querySelector('#todo-container');
  toDoContainer.innerHTML = '';
};



const toDoList = [];

const generalFormFunction = (() => {
  const clearForm = (title, notes = null, deadLine = null, priority = null) => {
    if (title) { 
      title.value = '';
    }

    if (notes) {
      notes.value = '';
    }

    if (deadLine) { 
      deadLine.value = 'MM-dd-yyyy';
    }

    if (priority) {
      priority.value = 'Please Choose One';
    }
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
        // create elements for DOM
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
  
        // style elements
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
  
        // add elements to DOM
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

    
    generalFormFunction.closeForm(toDoForm, titleInput, notesInput, deadLineInput, priorityInput);

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
  const openProjectFormButton = document.querySelector('#add-project-organizer');
  const addProjectButton = document.querySelector('#add-project');
  const projectTitleInput = document.querySelector('#project-title-input');
  const projectForm = document.querySelector('#project-form');
  const projectTitle = document.querySelector('#project-title-div');
  const closeProjectFormButton = document.querySelector('#project-form-closing-button');

  const cancelProjectButton = document.querySelector('#cancel-project')

  const openProjectForm = function () {
    generalFormFunction.openForm(projectForm);
  }

  const closeProjectForm = function () {
    generalFormFunction.closeForm(projectForm, projectTitleInput);
  }

  const createNewProjectOrganizer = function () {
    // create project elements
    const projectsContainerDiv = document.querySelector('#projects');
    const projectDiv = document.createElement('div');
    const divTag = document.createElement('i');
    const projectName = document.createElement('div');
    const editSymbol = document.createElement('i');
    const trashCan = document.createElement('i');

    // stylize project elements
    projectDiv.classList = 'project';
    divTag.classList.add('fa-solid', 'fa-tag', 'fa-lg');
    projectName.classList.add('project-name');
    projectName.innerHTML = `<span>${projectTitleInput.value}</span>`;
    editSymbol.classList.add('fa-solid', 'fa-pen-to-square');
    trashCan.classList.add('fa-solid', 'fa-trash');

    //add elements to DOM
    projectDiv.appendChild(divTag);
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(editSymbol);
    projectDiv.appendChild(trashCan);
    projectsContainerDiv.appendChild(projectDiv);

    projectInteractions.createProjectOrganizers();
    closeProjectForm();
    projectInteractions.addprojectsArrayToLocalStorage();
  }

  openProjectFormButton.addEventListener('click', openProjectForm, false);
  closeProjectFormButton.addEventListener('click', closeProjectForm, false);
  cancelProjectButton.addEventListener('click', closeProjectForm, false);
  addProjectButton.addEventListener('click', createNewProjectOrganizer, false);

})(); 

export { toDoForm, toDoList, generalFormFunction, projectForm, storageAvailable };
