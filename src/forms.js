'strict';
import './styles.css';
import { projectInteractions, Project } from './projects.js';
import { secondsToMilliseconds, format, compareAsc } from 'date-fns';
import { storageAvailable } from './index.js';
import { toDoInteractions } from './toDos';
const pageBody = document.querySelector('#page-body');
const pageHeader = document.querySelector('#page-header');

class ToDoItem {
  constructor(
    title,
    notes,
    deadLine,
    priority,
    project = null,
    complete = false
  ) {
    this.title = title;
    this.notes = notes;
    this.deadLine = deadLine;
    this.priority = priority;
    this.project = project;
    this.complete = complete;
  }
}

// Clears main toDo container each time changes happen to prepare for repopulation
const clearThingsToDoBeforeRepopulation = () => {
  const toDoContainer = document.querySelector('#todo-container');
  toDoContainer.innerHTML = '';
};

// Create Array that will store constantly updated toDo information
const toDoList = [];

// General Functionality all forms share
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

  const closeForm = (
    form,
    title,
    notes = null,
    deadLine = null,
    priority = null
  ) => {
    clearForm(title, notes, deadLine, priority);
    form.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  const openForm = (form) => {
    form.classList.remove('invisible');
    pageBody.classList.add('tint');
    pageHeader.classList.add('tint');
  };
  return { clearForm, closeForm, openForm };
})();

const assertFormValidation = (() => {

})();

// Full toDoForm functionality
const toDoForm = (() => {
  //Selecting DOM elements 
  const toDoForm = document.querySelector('#todo-form');
  const toDoInputs = document.querySelector('#todo-inputs');
  const toDoformClosingButton = document.querySelector('#closing-button');
  const addToDoButton = document.querySelector('#add-todo');
  const titleInput = document.querySelector('#title-input');
  const notesInput = document.querySelector('#notes-input');
  const deadLineInput = document.querySelector('#deadline-input');
  const priorityInput = document.querySelector('#priority-input');
  const toDoAddButton = document.getElementById('add');
  const currentProject = document.querySelector('#current-project');
  const cancelButton = document.querySelector('#cancel');
  const toDoEditFormLabel = document.querySelector('.task-label');
  const errorText = document.querySelectorAll('.error');

  let selectedProject = null;

  /**
   * shows error if form is not fully filled out
   */
  const showError = function (fieldWithError) {
        fieldWithError.nextElementSibling.textContent = 'ALL FIELDS REQUIRED*';
  }

  /**
   * clear errors after form submission
   */
  const clearError = function (errorToClear) {
        errorToClear.nextElementSibling.textContent = '';
  }

  /**
   * Takes a toDo object and creates/styles/adds functionality to a toDo Div 
   * in main toDo section of App
   * @param {} item a toDo object
   */
  const createToDoListItemDiv = function (item) {
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
    

    // style elements
    toDoDiv.classList.add('todo');
    checkBoxAndTitle.classList.add('checkbox-and-title');
    dateIconsForEditing.classList.add('date-icons-for-editing');
    editSymbol.classList.add(
      'fa-regular',
      'fa-pen-to-square',
      'fa-lg',
      'edit-symbol'
    );
    infoSymbol.classList.add(
      'fa-solid',
      'fa-circle-info',
      'fa-lg',
      'info-symbol'
    );
    trashCan.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');
    toDoDivTitle.innerText = item.title;
    toDoDate.innerText = item.deadLine;

    // Style Edge Cases
    if (!item.complete) {
      checkBox.classList.add('fa-regular', 'fa-square', 'fa-lg', 'checkbox');
    }
    if (item.complete) {
      checkBox.classList.add(
        'fa-regular',
        'fa-square-check',
        'fa-lg',
        'checkbox'
      );
    }
    if (item.priority === 'high') {
      toDoDiv.classList.add('high-priority');
    }
    if (item.priority === 'medium') {
      toDoDiv.classList.add('medium-priority');
    }

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

    // add functionality
    checkBox.addEventListener('click', toDoInteractions.markToDoAsComplete, false);
    editSymbol.addEventListener('click', toDoInteractions.openEditToDoForm, false);
    infoSymbol.addEventListener('click', toDoInteractions.checkToDoInfo, false);
    trashCan.addEventListener('click', toDoInteractions.deleteToDo, false);
  };

  /**
   * takes a list of toDo objects and creates DOM elements for each
   * @param {} list toDo Array
   */
  const addToDoListItemToThingsToDo = (list) => {
    clearThingsToDoBeforeRepopulation();

    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        createToDoListItemDiv(list[i]);
      }
    }
  };

  /**
   * closes toDoForm and clears inputs
   */
  const closeToDoForm = function () {
    generalFormFunction.closeForm(
      toDoForm,
      titleInput,
      notesInput,
      deadLineInput,
      priorityInput
    );
    toDoAddButton.innerText = 'Add';
    errorText.forEach((error) => {
      error.innerText = ''
;    })
  };

  /**
   * opens toDoForm. . .lol
   */
  const openToDoForm = () => {
    generalFormFunction.openForm(toDoForm);
    toDoEditFormLabel.innerHTML = '<h2>Enter Task</h2>'
    
  };

  /**
   * Takes an Array and an Object and clears the Array 
   * then repopulates with objects from local Storage
   * @param {*} arrayToPopulate toDoList 
   * @param {*} toDoObject localStorage
   */
  const rePopulateArray = (arrayToPopulate, toDoObject) => {
    if (arrayToPopulate.length > 0) {
      while (arrayToPopulate.length > 0) {
        arrayToPopulate.pop();
      }
    }

    for (const toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string' && toDo !== 'projectsArray') {
        let currentToDo = JSON.parse(toDoObject[toDo]);
        arrayToPopulate.push(currentToDo);
      }
    }
  };

  /**
   * creates a toDo item and updates localStorage/toDoList to contain it
   */
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

    //create new toDo class
    const toDo = new ToDoItem(
      titleInput.value,
      notesInput.value,
      deadLineInput.value,
      priorityInput.value,
      selectedProject
    );
    
    //close toDo Form
    generalFormFunction.closeForm(
      toDoForm,
      titleInput,
      notesInput,
      deadLineInput,
      priorityInput
    );

    //check to see if local storage is available, and if so add to local Storage
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

  /**
   * check if form is fully filled out before entering
   */
  const toDoFormValidation = function (event) {
    const inputsArray = [titleInput, notesInput, deadLineInput, priorityInput];
    for (let i = 0; i < inputsArray.length; i++) {
      inputsArray[i].setAttribute('required', '');
    }
    if (!titleInput.validity.valid || 
      !notesInput.validity.valid ||
      !deadLineInput.validity.valid ||
      !priorityInput.validity.valid) {
      for(let i = 0; i < inputsArray.length; i++) {
        if(!inputsArray[i].validity.valid) {
          showError(inputsArray[i]);
        } else {
          clearError(inputsArray[i]);
        }
      }
      
    } else {
      for (let i = 0; i < inputsArray.length; i++) {
        clearError(inputsArray[i]);
      }
      createToDoItem();
    }
  
    
  };

  //Adding all event listeners
  toDoformClosingButton.addEventListener('click', closeToDoForm, false);
  addToDoButton.addEventListener('click', openToDoForm, false);
  toDoAddButton.addEventListener('click', toDoFormValidation, false);
  cancelButton.addEventListener('click', closeToDoForm, false);

  return {
    toDoList,
    rePopulateArray,
    addToDoListItemToThingsToDo,
    createToDoListItemDiv,
    closeToDoForm,
    openToDoForm,
    createToDoItem,
  };
})();

// General functionality for project form
const projectForm = (() => {
  //DOM element selections
  const openProjectFormButton = document.querySelector('#add-project-organizer');
  const addProjectButton = document.querySelector('#add-project');
  const projectTitleInput = document.querySelector('#project-title-input');
  const projectForm = document.querySelector('#project-form');
  const projectTitle = document.querySelector('#project-title-div');
  const closeProjectFormButton = document.querySelector('#project-form-closing-button');
  const cancelProjectButton = document.querySelector('#cancel-project');

  /**
   * opens project form
   */
  const openProjectForm = function () {
    generalFormFunction.openForm(projectForm);
  };

  /**
   * closes project form
   */
  const closeProjectForm = function () {
    generalFormFunction.closeForm(projectForm, projectTitleInput);
  };

  /**
   * takes a title and creates a projectDiv/adds style and functionality
   * @param {*} title 
   */  
  const createProjectOrganizerDiv = function (title) {
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
    projectName.innerHTML = `<span>${title}</span>`;
    editSymbol.classList.add('fa-solid', 'fa-pen-to-square');
    trashCan.classList.add('fa-solid', 'fa-trash');

    //add elements to DOM
    projectDiv.appendChild(divTag);
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(editSymbol);
    projectDiv.appendChild(trashCan);
    projectsContainerDiv.appendChild(projectDiv);

    //add functionality
    editSymbol.addEventListener(
      'click',
      projectInteractions.showEditProjectTitleForm,
      false
    );
    trashCan.addEventListener(
      'click',
      projectInteractions.deleteProject,
      false
    );
  };
  
  /**
   * creates new project folder on sideMenu
   */
  const createNewProjectOrganizer = function () {
    createProjectOrganizerDiv(projectTitleInput.value);

    projectInteractions.createProjectOrganizers();
    closeProjectForm();
    projectInteractions.addprojectsArrayToLocalStorage();
  };

  // Add functionality to project form
  openProjectFormButton.addEventListener('click', openProjectForm, false);
  closeProjectFormButton.addEventListener('click', closeProjectForm, false);
  cancelProjectButton.addEventListener('click', closeProjectForm, false);
  addProjectButton.addEventListener('click', createNewProjectOrganizer, false);

  return {
    createNewProjectOrganizer,
    createProjectOrganizerDiv,
    openProjectForm,
    closeProjectForm,
  };
})();

export {
  toDoForm,
  toDoList,
  generalFormFunction,
  projectForm,
  storageAvailable,
  clearThingsToDoBeforeRepopulation,
};
