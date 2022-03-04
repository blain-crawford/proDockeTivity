/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forms.js":
/*!**********************!*\
  !*** ./src/forms.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toDoForm": () => (/* binding */ toDoForm),
/* harmony export */   "toDoList": () => (/* binding */ toDoList),
/* harmony export */   "generalFormFunction": () => (/* binding */ generalFormFunction),
/* harmony export */   "projectForm": () => (/* binding */ projectForm),
/* harmony export */   "storageAvailable": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_2__.storageAvailable),
/* harmony export */   "clearThingsToDoBeforeRepopulation": () => (/* binding */ clearThingsToDoBeforeRepopulation)
/* harmony export */ });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _toDos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toDos */ "./src/toDos.js");
'strict';

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var pageBody = document.querySelector('#page-body');
var pageHeader = document.querySelector('#page-header');

var ToDoItem = /*#__PURE__*/_createClass(function ToDoItem(title, notes, deadLine, priority) {
  var project = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var complete = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  _classCallCheck(this, ToDoItem);

  this.title = title;
  this.notes = notes;
  this.deadLine = deadLine;
  this.priority = priority;
  this.project = project;
  this.complete = complete;
}); // Clears main toDo container each time changes happen to prepare for repopulation


var clearThingsToDoBeforeRepopulation = function clearThingsToDoBeforeRepopulation() {
  var toDoContainer = document.querySelector('#todo-container');
  toDoContainer.innerHTML = '';
}; // Create Array that will store constantly updated toDo information


var toDoList = []; // General Functionality all forms share

var generalFormFunction = function () {
  var clearForm = function clearForm(title) {
    var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var deadLine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

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

  var closeForm = function closeForm(form, title) {
    var notes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var deadLine = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var priority = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    clearForm(title, notes, deadLine, priority);
    form.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  var openForm = function openForm(form) {
    form.classList.remove('invisible');
    pageBody.classList.add('tint');
    pageHeader.classList.add('tint');
  };

  return {
    clearForm: clearForm,
    closeForm: closeForm,
    openForm: openForm
  };
}(); // Full toDoForm functionality


var toDoForm = function () {
  //Selecting DOM elements 
  var toDoformClosingButton = document.querySelector('#closing-button');
  var addToDoButton = document.querySelector('#add-todo');
  var toDoForm = document.querySelector('#todo-form');
  var titleInput = document.querySelector('#title-input');
  var notesInput = document.querySelector('#notes-input');
  var deadLineInput = document.querySelector('#deadline-input');
  var priorityInput = document.querySelector('#priority-input');
  var toDoAddButton = document.getElementById('add');
  var currentProject = document.querySelector('#current-project');
  var cancelButton = document.querySelector('#cancel');
  var toDoEditFormLabel = document.querySelector('.task-label');
  var selectedProject = null;
  /**
   * Takes a toDo object and creates/styles/adds functionality to a toDo Div 
   * in main toDo section of App
   * @param {} item a toDo object
   */

  var createToDoListItemDiv = function createToDoListItemDiv(item) {
    // create elements for DOM
    var toDoContainer = document.querySelector('#todo-container');
    var checkBoxAndTitle = document.createElement('div');
    var toDoDiv = document.createElement('div');
    var checkBox = document.createElement('i');
    var toDoDivTitle = document.createElement('p');
    var dateIconsForEditing = document.createElement('div');
    var toDoDate = document.createElement('p');
    var editSymbol = document.createElement('i');
    var infoSymbol = document.createElement('i');
    var trashCan = document.createElement('i'); // style elements

    toDoDiv.classList.add('todo');
    checkBoxAndTitle.classList.add('checkbox-and-title');
    dateIconsForEditing.classList.add('date-icons-for-editing');
    editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'fa-lg', 'edit-symbol');
    infoSymbol.classList.add('fa-solid', 'fa-circle-info', 'fa-lg', 'info-symbol');
    trashCan.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');
    toDoDivTitle.innerText = item.title;
    toDoDate.innerText = item.deadLine; // Style Edge Cases

    if (!item.complete) {
      checkBox.classList.add('fa-regular', 'fa-square', 'fa-lg', 'checkbox');
    }

    if (item.complete) {
      checkBox.classList.add('fa-regular', 'fa-square-check', 'fa-lg', 'checkbox');
    }

    if (item.priority === 'high') {
      toDoDiv.classList.add('high-priority');
    }

    if (item.priority === 'medium') {
      toDoDiv.classList.add('medium-priority');
    } // add elements to DOM


    checkBoxAndTitle.appendChild(checkBox);
    checkBoxAndTitle.appendChild(toDoDivTitle);
    toDoDiv.appendChild(checkBoxAndTitle);
    dateIconsForEditing.appendChild(toDoDate);
    dateIconsForEditing.appendChild(editSymbol);
    dateIconsForEditing.appendChild(infoSymbol);
    dateIconsForEditing.appendChild(trashCan);
    toDoDiv.appendChild(dateIconsForEditing);
    toDoContainer.appendChild(toDoDiv); // add functionality

    checkBox.addEventListener('click', _toDos__WEBPACK_IMPORTED_MODULE_3__.toDoInteractions.markToDoAsComplete, false);
    editSymbol.addEventListener('click', _toDos__WEBPACK_IMPORTED_MODULE_3__.toDoInteractions.openEditToDoForm, false);
    infoSymbol.addEventListener('click', _toDos__WEBPACK_IMPORTED_MODULE_3__.toDoInteractions.checkToDoInfo, false);
    trashCan.addEventListener('click', _toDos__WEBPACK_IMPORTED_MODULE_3__.toDoInteractions.deleteToDo, false);
  };
  /**
   * takes a list of toDo objects and creates DOM elements for each
   * @param {} list toDo Array
   */


  var addToDoListItemToThingsToDo = function addToDoListItemToThingsToDo(list) {
    clearThingsToDoBeforeRepopulation();

    if (list.length > 0) {
      for (var i = 0; i < list.length; i++) {
        createToDoListItemDiv(list[i]);
      }
    }
  };
  /**
   * closes toDoForm and clears inputs
   */


  var closeToDoForm = function closeToDoForm() {
    generalFormFunction.closeForm(toDoForm, titleInput, notesInput, deadLineInput, priorityInput);
    toDoAddButton.innerText = 'Add';
  };
  /**
   * opens toDoForm. . .lol
   */


  var openToDoForm = function openToDoForm() {
    generalFormFunction.openForm(toDoForm);
    toDoEditFormLabel.innerHTML = '<h2>Enter Task</h2>';
  };
  /**
   * Takes an Array and an Object and clears the Array 
   * then repopulates with objects from local Storage
   * @param {*} arrayToPopulate toDoList 
   * @param {*} toDoObject localStorage
   */


  var rePopulateArray = function rePopulateArray(arrayToPopulate, toDoObject) {
    if (arrayToPopulate.length > 0) {
      while (arrayToPopulate.length > 0) {
        arrayToPopulate.pop();
      }
    }

    for (var toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string' && toDo !== 'projectsArray') {
        var currentToDo = JSON.parse(toDoObject[toDo]);
        arrayToPopulate.push(currentToDo);
      }
    }
  };
  /**
   * creates a toDo item and updates localStorage/toDoList to contain it
   */


  var createToDoItem = function createToDoItem() {
    if (currentProject.textContent !== 'All' && currentProject.textContent !== 'Week' && currentProject.textContent !== 'Month' && currentProject.textContent !== 'Most Important' && currentProject.textContent !== 'Completed') {
      selectedProject = currentProject.textContent;
    } //create new toDo class


    var toDo = new ToDoItem(titleInput.value, notesInput.value, deadLineInput.value, priorityInput.value, selectedProject); //close toDo Form

    generalFormFunction.closeForm(toDoForm, titleInput, notesInput, deadLineInput, priorityInput); //check to see if local storage is available, and if so add to local Storage

    if ((0,_index_js__WEBPACK_IMPORTED_MODULE_2__.storageAvailable)('localStorage')) {
      if (!localStorage.getItem(toDo.title)) {
        localStorage.setItem("".concat(toDo.title), JSON.stringify(toDo));
        rePopulateArray(toDoList, localStorage);

        if (currentProject.textContent === 'All' || currentProject.textContent === 'Week' || currentProject.textContent === 'Month' || currentProject.textContent === 'Most Important' || currentProject.textContent === 'Completed') {
          addToDoListItemToThingsToDo(toDoList);
        } else {
          _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.createProjectOrganizers();

          for (var i = 0; i < _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.projectsArray.length; i++) {
            var individualProject = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.projectsArray[i];

            if (individualProject.title === currentProject.innerText) {
              addToDoListItemToThingsToDo(individualProject.projectContainer);
            }
          }
        }
      } else {
        alert('There is no local Storage here!');
      }
    }
  }; //Adding all event listeners


  toDoformClosingButton.addEventListener('click', closeToDoForm, false);
  addToDoButton.addEventListener('click', openToDoForm, false);
  toDoAddButton.addEventListener('click', createToDoItem, false);
  cancelButton.addEventListener('click', closeToDoForm, false);
  return {
    toDoList: toDoList,
    rePopulateArray: rePopulateArray,
    addToDoListItemToThingsToDo: addToDoListItemToThingsToDo,
    createToDoListItemDiv: createToDoListItemDiv,
    closeToDoForm: closeToDoForm,
    openToDoForm: openToDoForm,
    createToDoItem: createToDoItem
  };
}(); // General functionality for project form


var projectForm = function () {
  //DOM element selections
  var openProjectFormButton = document.querySelector('#add-project-organizer');
  var addProjectButton = document.querySelector('#add-project');
  var projectTitleInput = document.querySelector('#project-title-input');
  var projectForm = document.querySelector('#project-form');
  var projectTitle = document.querySelector('#project-title-div');
  var closeProjectFormButton = document.querySelector('#project-form-closing-button');
  var cancelProjectButton = document.querySelector('#cancel-project');
  /**
   * opens project form
   */

  var openProjectForm = function openProjectForm() {
    generalFormFunction.openForm(projectForm);
  };
  /**
   * closes project form
   */


  var closeProjectForm = function closeProjectForm() {
    generalFormFunction.closeForm(projectForm, projectTitleInput);
  };
  /**
   * takes a title and creates a projectDiv/adds style and functionality
   * @param {*} title 
   */


  var createProjectOrganizerDiv = function createProjectOrganizerDiv(title) {
    // create project elements
    var projectsContainerDiv = document.querySelector('#projects');
    var projectDiv = document.createElement('div');
    var divTag = document.createElement('i');
    var projectName = document.createElement('div');
    var editSymbol = document.createElement('i');
    var trashCan = document.createElement('i'); // stylize project elements

    projectDiv.classList = 'project';
    divTag.classList.add('fa-solid', 'fa-tag', 'fa-lg');
    projectName.classList.add('project-name');
    projectName.innerHTML = "<span>".concat(title, "</span>");
    editSymbol.classList.add('fa-solid', 'fa-pen-to-square');
    trashCan.classList.add('fa-solid', 'fa-trash'); //add elements to DOM

    projectDiv.appendChild(divTag);
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(editSymbol);
    projectDiv.appendChild(trashCan);
    projectsContainerDiv.appendChild(projectDiv); //add functionality

    editSymbol.addEventListener('click', _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.showEditProjectTitleForm, false);
    trashCan.addEventListener('click', _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.deleteProject, false);
  };
  /**
   * creates new project folder on sideMenu
   */


  var createNewProjectOrganizer = function createNewProjectOrganizer() {
    createProjectOrganizerDiv(projectTitleInput.value);
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.createProjectOrganizers();
    closeProjectForm();
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectInteractions.addprojectsArrayToLocalStorage();
  }; // Add functionality to project form


  openProjectFormButton.addEventListener('click', openProjectForm, false);
  closeProjectFormButton.addEventListener('click', closeProjectForm, false);
  cancelProjectButton.addEventListener('click', closeProjectForm, false);
  addProjectButton.addEventListener('click', createNewProjectOrganizer, false);
  return {
    createNewProjectOrganizer: createNewProjectOrganizer,
    createProjectOrganizerDiv: createProjectOrganizerDiv,
    openProjectForm: openProjectForm,
    closeProjectForm: closeProjectForm
  };
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storageAvailable": () => (/* binding */ storageAvailable),
/* harmony export */   "autoPopulateThingsToDo": () => (/* binding */ autoPopulateThingsToDo),
/* harmony export */   "autoPopulateProjects": () => (/* binding */ autoPopulateProjects)
/* harmony export */ });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/forms.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _timeline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline.js */ "./src/timeline.js");
'strict';





/**
 * seeing if local storage is available
 */

var storageAvailable = function storageAvailable(type) {
  var storage;

  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')(storage && storage.length !== 0);
  }
};
/**
 * checks size of window for sideMenu placement/removes tent
 */


var handleSideMenuAndTint = function () {
  var pageHeader = document.querySelector('#page-header');
  var pageBody = document.querySelector('#page-body');
  var menuDropper = document.querySelector('.menu-dropper');
  var sideMenu = document.querySelector('#side-menu');
  var todoListsDisplay = document.querySelector('#todo-lists');

  var removeTintForLargeScreens = function () {
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000 && !pageBody.classList.contains('tint')) {
        sideMenu.classList.remove('show-side-menu');
        todoListsDisplay.classList.remove('tint');
        pageHeader.classList.remove('tint');
      }
    });
  }();
  /**
   * when screen size is too small, this adds functionality to show it
   */


  var showSideMenu = function showSideMenu() {
    sideMenu.classList.toggle('show-side-menu');
    todoListsDisplay.classList.toggle('tint');
  };

  menuDropper.addEventListener('click', showSideMenu, false);
}();
/**
 * starts the document with locally stored toDo's in ALL category present
 */


var autoPopulateThingsToDo = function autoPopulateThingsToDo() {
  _forms__WEBPACK_IMPORTED_MODULE_1__.toDoForm.rePopulateArray(_forms__WEBPACK_IMPORTED_MODULE_1__.toDoList, localStorage);
  _forms__WEBPACK_IMPORTED_MODULE_1__.toDoForm.addToDoListItemToThingsToDo(_forms__WEBPACK_IMPORTED_MODULE_1__.toDoList);
};

autoPopulateThingsToDo();
/**
 * Starts the document with locally stored projects populated
 * and linked to proper toDo list
 */

var autoPopulateProjects = function autoPopulateProjects() {
  if (!localStorage.getItem('projectsArray')) {
    return;
  } else {
    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.fillProjectsArray();

    for (var i = 0; i < _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.projectsArray.length; i++) {
      var projectToCreate = _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.projectsArray[i];
      _forms__WEBPACK_IMPORTED_MODULE_1__.projectForm.createProjectOrganizerDiv(projectToCreate.title);
    }

    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.createProjectOrganizers();
  }
};

autoPopulateProjects();


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectInteractions": () => (/* binding */ projectInteractions),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _forms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms.js */ "./src/forms.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Project = /*#__PURE__*/_createClass(function Project(title, projectContainer) {
  _classCallCheck(this, Project);

  this.title = title;
  this.projectContainer = projectContainer;
});

var projectInteractions = function () {
  // Select DOM elements in project Section of App
  var currentProjectH1 = document.querySelector('#current-project');
  var projectsContainerDiv = document.querySelector('#projects');
  var currentProject = document.querySelector('#current-project');
  var addButton = document.querySelector('#add-project');
  var titleInputDiv = document.querySelector('#project-title-input');
  var editProjectFormTitle = document.querySelector('#project-form-title');
  var projectList = document.querySelectorAll('.project-name');
  var projectDeleteButtons = document.querySelectorAll('.fa-trash');
  var timeLineDivs = document.querySelectorAll('.timeline-div');
  var allTimeLine = document.querySelector('#all'); // Creates array for holding all projects

  var projectsArray = []; //Alter background color of project you're currently viewing

  var showSelectedProject = function showSelectedProject(project) {
    timeLineDivs.forEach(function (div) {
      div.classList.remove('current-list-view');
    });
    projectList.forEach(function (project) {
      project.parentElement.classList.remove('current-list-view');
    });
    project.parentElement.classList.add('current-list-view');
  };
  /**
   * Clears side Menu project container before repopulating after projectArray change
   */


  var clearProjectContainerDivBeforeRepopulation = function clearProjectContainerDivBeforeRepopulation() {
    projectsContainerDiv.innerHTML = '';
  };
  /**
   * When session is opened this fills projectsArray from localMemory
   * @returns
   */


  var fillProjectsArray = function fillProjectsArray() {
    if (localStorage.projectsArray) {
      if (projectsArray.length >= 0) {
        while (projectsArray.length > 0) {
          projectsArray.pop();
        }

        for (var i = 0; i < JSON.parse(localStorage.projectsArray).length; i++) {
          projectsArray.push(JSON.parse(localStorage.projectsArray)[i]);
        }
      }
    } else {
      return;
    }
  };
  /**
   * when changes are made to projectsArray, this re-updates it in localStorage
   */


  var addprojectsArrayToLocalStorage = function addprojectsArrayToLocalStorage() {
    if ((0,_index_js__WEBPACK_IMPORTED_MODULE_1__.storageAvailable)('localStorage')) {
      if (!localStorage.getItem(projectsArray)) {
        localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
      } else {
        localStorage.removeItem('projectsArray');
        localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
      }
    }

    fillProjectsArray();
  };
  /**
   * Checks to see which project is selected and populates toDos in main page
   * with toDo's from this project
   * @param {*} projectObject object containing project list
   * @param {*} toDoObject object containing key/value pairs of toDo objects
   */


  var populateProjectOrganizers = function populateProjectOrganizers(projectObject, toDoObject) {
    for (var toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string' && toDo !== projectsArray) {
        var currentToDo = JSON.parse(toDoObject[toDo]);

        if (projectObject.title === currentToDo.project) {
          projectObject.projectContainer.push(currentToDo);
        }
      }
    }
  };
  /**
   * Choose which project will be highlighted, and which project from projectsArray is used
   * to populate the toDo page section
   */


  var chooseProject = function chooseProject() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    (0,_forms_js__WEBPACK_IMPORTED_MODULE_0__.clearThingsToDoBeforeRepopulation)();

    for (var i = 0; i < projectList.length; i++) {
      var _currentProject = projectsArray[i];

      if (_currentProject.title === this.innerText) {
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoForm.addToDoListItemToThingsToDo(_currentProject.projectContainer);
      }
    }

    showSelectedProject(this);
  };
  /**
   * Checks to see if there are any projects in projects arrary
   * And populates the sideMedu projects session with them, as well
   * as filling projectsArray with project objects
   */


  var createProjectOrganizers = function createProjectOrganizers() {
    projectList = document.querySelectorAll('.project-name');

    if (projectsArray.length > 0) {
      while (projectsArray.length > 0) {
        projectsArray.pop();
      }
    }

    if (projectList.length > 0) {
      projectList.forEach(function (project) {
        var projectOrganizer = new Project(project.innerText, []);
        populateProjectOrganizers(projectOrganizer, localStorage);
        projectsArray.push(projectOrganizer);
        project.addEventListener('click', chooseProject, false);
      });
    }
  };
  /**
   * Changes the title of a projectContainer/ProjectObject and re-renders app
   */


  var changeTitle = function changeTitle() {
    var titleToChange = editProjectFormTitle.textContent;
    addButton.innerText = 'Add';

    for (var i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].title === titleToChange) {
        projectsArray[i].title = titleInputDiv.value;

        for (var j = 0; j < projectsArray[i].projectContainer.length; j++) {
          var currentToDo = projectsArray[i].projectContainer[j];
          currentToDo.project = titleInputDiv.value;
          localStorage.removeItem(currentToDo.title);
          localStorage.setItem("".concat(currentToDo.title), JSON.stringify(currentToDo));
        }
      }
    }

    currentProjectH1.textContent = titleInputDiv.value;
    addButton.removeEventListener('click', changeTitle);
    addButton.addEventListener('click', _forms_js__WEBPACK_IMPORTED_MODULE_0__.projectForm.createNewProjectOrganizer, false); //Rerender App

    clearProjectContainerDivBeforeRepopulation();
    addprojectsArrayToLocalStorage();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateThingsToDo)();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateProjects)();
    _forms_js__WEBPACK_IMPORTED_MODULE_0__.projectForm.closeProjectForm();
  };
  /**
   * Opens up form for altering project title
   */


  var showEditProjectTitleForm = function showEditProjectTitleForm() {
    var projectOrganizerToEdit = this.parentElement.querySelector(':nth-child(2)').innerText;
    editProjectFormTitle.firstChild.textContent = projectOrganizerToEdit;
    addButton.innerText = 'Edit Title';
    titleInputDiv.value = projectOrganizerToEdit; //change event listeners

    addButton.removeEventListener('click', _forms_js__WEBPACK_IMPORTED_MODULE_0__.projectForm.createNewProjectOrganizer);
    addButton.addEventListener('click', changeTitle, false);
    _forms_js__WEBPACK_IMPORTED_MODULE_0__.projectForm.openProjectForm();
  };
  /**
   * Deletes a project, clears it's toDos from the local storage
   * Then re-renders app with updated info
   */


  var deleteProject = function deleteProject() {
    var projectOrganizerToDelete = this.parentElement.querySelector(':nth-child(2)').innerText;

    for (var i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].title === projectOrganizerToDelete) {
        var currentProjectContainer = projectsArray[i].projectContainer;

        for (var j = 0; j < currentProjectContainer.length; j++) {
          if (localStorage.getItem(currentProjectContainer[j].title) !== null) {
            localStorage.removeItem(currentProjectContainer[j].title);
          }
        }

        projectsArray.splice(i, 1);
      }
    }

    clearProjectContainerDivBeforeRepopulation();
    addprojectsArrayToLocalStorage();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateProjects)();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateThingsToDo)();
    currentProject.innerText = 'All';
    allTimeLine.classList.add('current-list-view');
  };

  createProjectOrganizers();
  /**
   * Adds necessary event listeners
   */

  projectList.forEach(function (project) {
    project.addEventListener('click', chooseProject, false);
  });
  projectDeleteButtons.forEach(function (button) {
    button.addEventListener('click', deleteProject, false);
  });
  return {
    createProjectOrganizers: createProjectOrganizers,
    populateProjectOrganizers: populateProjectOrganizers,
    projectsArray: projectsArray,
    addprojectsArrayToLocalStorage: addprojectsArrayToLocalStorage,
    fillProjectsArray: fillProjectsArray,
    deleteProject: deleteProject,
    showEditProjectTitleForm: showEditProjectTitleForm,
    clearProjectContainerDivBeforeRepopulation: clearProjectContainerDivBeforeRepopulation,
    showSelectedProject: showSelectedProject
  };
}();



/***/ }),

/***/ "./src/timeline.js":
/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/forms.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseISO/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisMonth/index.js");



var timelineInteractions = function () {
  //DOM creation
  var currentProject = document.querySelector('#current-project');
  var timeLineDivs = document.querySelectorAll('.timeline-div');
  var allTimeLine = document.querySelector('#all');
  var weekTimeLine = document.querySelector('#week');
  var monthTimeLine = document.querySelector('#month');
  var mostImportantTimeLine = document.querySelector('#most-important');
  var completedTimeLine = document.querySelector('#completed');
  var projectContainer = document.querySelector('#projects');
  /**
   * Changes Background of all timeLine Divs to show which is being views
   * @param {*} timeLine current timeline to view
   */

  var showSelectedTimeLine = function showSelectedTimeLine(timeLine) {
    timeLineDivs.forEach(function (div) {
      div.classList.remove('current-list-view');
    });
    projectContainer.childNodes.forEach(function (project) {
      project.classList.remove('current-list-view');
    });
    timeLine.classList.add('current-list-view');
  }; // All functions for which timeline to view


  var chooseAllTimeLine = function chooseAllTimeLine() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    _forms__WEBPACK_IMPORTED_MODULE_0__.toDoForm.addToDoListItemToThingsToDo(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList);
    showSelectedTimeLine(allTimeLine);
  };

  var chooseWeekTimeLine = function chooseWeekTimeLine() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    (0,_forms__WEBPACK_IMPORTED_MODULE_0__.clearThingsToDoBeforeRepopulation)();

    for (var i = 0; i < _forms__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].deadLine))) {
        _forms__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoListItemDiv(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]);
      }
    }

    showSelectedTimeLine(weekTimeLine);
  };

  var chooseMonthTimeLine = function chooseMonthTimeLine() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    (0,_forms__WEBPACK_IMPORTED_MODULE_0__.clearThingsToDoBeforeRepopulation)();

    for (var i = 0; i < _forms__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if ((0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].deadLine))) {
        _forms__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoListItemDiv(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]);
      }
    }

    showSelectedTimeLine(monthTimeLine);
  };

  var chooseMostImportantTimeLine = function chooseMostImportantTimeLine() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    (0,_forms__WEBPACK_IMPORTED_MODULE_0__.clearThingsToDoBeforeRepopulation)();

    for (var i = 0; i < _forms__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].priority === 'high') {
        _forms__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoListItemDiv(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]);
      }
    }

    showSelectedTimeLine(mostImportantTimeLine);
  };

  var chooseCompletedTimeLine = function chooseCompletedTimeLine() {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    (0,_forms__WEBPACK_IMPORTED_MODULE_0__.clearThingsToDoBeforeRepopulation)();

    for (var i = 0; i < _forms__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].complete) {
        _forms__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoListItemDiv(_forms__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]);
      }
    }

    showSelectedTimeLine(completedTimeLine);
  }; // Add all event listeners


  allTimeLine.addEventListener('click', chooseAllTimeLine.bind(allTimeLine), false);
  weekTimeLine.addEventListener('click', chooseWeekTimeLine, false);
  monthTimeLine.addEventListener('click', chooseMonthTimeLine, false);
  mostImportantTimeLine.addEventListener('click', chooseMostImportantTimeLine, false);
  completedTimeLine.addEventListener('click', chooseCompletedTimeLine, false);
}();

/***/ }),

/***/ "./src/toDos.js":
/*!**********************!*\
  !*** ./src/toDos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toDoInteractions": () => (/* binding */ toDoInteractions)
/* harmony export */ });
/* harmony import */ var _forms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms.js */ "./src/forms.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");




var toDoInteractions = function () {
  // General page DOM selection
  var pageBody = document.querySelector('#page-body');
  var pageHeader = document.querySelector('#page-header');
  var projectList = document.querySelectorAll('.project-name');
  var currentProject = document.querySelector('#current-project');
  var allTimeLine = document.querySelector('#all'); // ToDo Div DOM selection

  var checkBox = document.querySelectorAll('.checkbox');
  var editSymbol = document.querySelector('#edit-symbol');
  var infoSymbol = document.querySelectorAll('.info-symbol'); // Info-form DOM selection

  var toDoInfoForm = document.querySelector('#todo-info');
  var toDoInfoFormClosingButton = document.querySelector('#info-closing-button');
  var titleDiv = document.querySelector('#info-title-input');
  var notesDiv = document.querySelector('#info-notes-input');
  var deadLineDiv = document.querySelector('#info-deadline-input');
  var priorityDiv = document.querySelector('#info-priority-input'); //Edit-form DOM selection

  var toDoEditForm = document.querySelector('todo-form');
  var toDoEditFormLabel = document.querySelector('.task-label');
  var titleInput = document.querySelector('#title-input');
  var notesInput = document.querySelector('#notes-input');
  var deadLineInput = document.querySelector('#deadline-input');
  var priorityInput = document.querySelector('#priority-input');
  var addButton = document.querySelector('#add');
  /**
   * update toDo status as complete, and alter check box to marked
   */

  var markToDoAsComplete = function markToDoAsComplete() {
    var toDoToCheck = this.nextSibling.textContent;

    if (this.classList.contains('fa-square')) {
      this.classList.remove('fa-square');
      this.classList.add('fa-square-check');

      for (var i = 0; i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
        if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title === toDoToCheck) {
          _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].complete = true;
          localStorage.removeItem(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title);
          localStorage.setItem("".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title), JSON.stringify(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]));
        }
      }
    } else if (this.classList.contains('fa-square-check')) {
      this.classList.remove('fa-square-check');
      this.classList.add('fa-square');

      for (var _i = 0; _i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; _i++) {
        if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i].title === toDoToCheck) {
          _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i].complete = false;
          localStorage.removeItem(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i].title);
          localStorage.setItem("".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i].title), JSON.stringify(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i]));
        }
      }
    } // Re-render App


    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.clearProjectContainerDivBeforeRepopulation();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateProjects)();
    projectList = document.querySelectorAll('.project-name');

    for (var _i2 = 0; _i2 < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; _i2++) {
      if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i2].title === this.nextSibling.innerText) {
        var projectToSelect = _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[_i2].project;

        for (var j = 0; j < projectList.length; j++) {
          if (projectList[j].firstChild.innerText === projectToSelect && currentProject.innerText === projectToSelect) {
            var projectOrganizerToSelect = projectList[j].parentElement;
            projectOrganizerToSelect.classList.add('current-list-view');
          }
        }
      }
    }
  };
  /**
   * Alter toDo and repopulate projects, toDoList, and local memory
   */


  var editToDoItem = function editToDoItem() {
    var toDoToEdit = toDoEditFormLabel.firstChild.innerText;

    for (var i = 0; i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title === toDoToEdit) {
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title = titleInput.value;
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].notes = notesInput.value;
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].deadLine = deadLineInput.value;
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].priority = priorityInput.value;

        for (var j = 0; j < localStorage.length; j++) {
          if (localStorage[toDoToEdit]) {
            localStorage.removeItem(toDoToEdit);
            localStorage.setItem("".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title), JSON.stringify(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i]));
          }
        }
      }
    } //re-render App


    _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoForm.closeToDoForm();
    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.clearProjectContainerDivBeforeRepopulation();
    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.addprojectsArrayToLocalStorage();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateProjects)();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateThingsToDo)();
    currentProject.innerText = 'All';
    allTimeLine.classList.add('current-list-view'); //Change ToDoForm back to normal

    toDoEditFormLabel.innerHTML = '<h2>Enter Task</h2>';
    addButton.innerText = 'Add';
    addButton.removeEventListener('click', editToDoItem, false);
    addButton.addEventListener('click', _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoItem, false);
  };
  /**
   * Opens up form for editing toDo
   */


  var openEditToDoForm = function openEditToDoForm() {
    _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoForm.openToDoForm();
    var toDoListItemToCheck = this.parentElement.previousSibling.innerText;
    toDoEditFormLabel.innerHTML = "<h2>".concat(toDoListItemToCheck, "</h2>");

    for (var i = 0; i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title === toDoListItemToCheck) {
        titleInput.value = _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title;
        notesInput.value = _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].notes;
        deadLineInput.value = _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].deadLine;
        priorityInput.value = _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].priority;
      }
    }

    addButton.innerText = 'Edit';
    addButton.removeEventListener('click', _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoForm.createToDoItem, false);
    addButton.addEventListener('click', editToDoItem, false);
  };
  /**
   * Opens up form showing toDo info
   */


  var checkToDoInfo = function checkToDoInfo() {
    var toDoListItemToCheck = this.parentElement.previousSibling.innerText;

    for (var i = 0; i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title === toDoListItemToCheck) {
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.generalFormFunction.openForm(toDoInfoForm);
        titleDiv.innerHTML = "<p>".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title, "</p>");
        notesDiv.innerHTML = "<p>".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].notes, "</p>");
        deadLineDiv.innerHTML = "<p>".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].deadLine, "</p>");
        priorityDiv.innerHTML = "<p>".concat(_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].priority, "</p>");
      }
    }
  };
  /**
   * closes info form
   */


  var closeToDoInfoForm = function closeToDoInfoForm() {
    _forms_js__WEBPACK_IMPORTED_MODULE_0__.generalFormFunction.closeForm(toDoInfoForm, titleDiv, notesDiv, deadLineDiv, priorityDiv);
  };
  /**
   * Deletes a toDo and re-renders getting rid of it in local storage and projectsArray/toDoList
   */


  var deleteToDo = function deleteToDo() {
    var toDoListItemToDelete = this.parentElement.previousSibling.innerText;

    for (var i = 0; i < _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.length; i++) {
      if (_forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList[i].title === toDoListItemToDelete) {
        _forms_js__WEBPACK_IMPORTED_MODULE_0__.toDoList.splice(i, 1);

        for (var j = 0; j < localStorage.length; j++) {
          localStorage.removeItem(toDoListItemToDelete);
        }
      }
    } // re-render App


    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.clearProjectContainerDivBeforeRepopulation();
    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projectInteractions.addprojectsArrayToLocalStorage();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateThingsToDo)();
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.autoPopulateProjects)();
    currentProject.innerText = 'All';
    allTimeLine.classList.add('current-list-view');
  };

  toDoInfoFormClosingButton.addEventListener('click', closeToDoInfoForm, false);
  return {
    markToDoAsComplete: markToDoAsComplete,
    checkToDoInfo: checkToDoInfo,
    openEditToDoForm: openEditToDoForm,
    deleteToDo: deleteToDo
  };
}();



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Whitelist-Demo.otf */ "./src/fonts/Whitelist-Demo.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/hlmt-rounded.ttf */ "./src/fonts/hlmt-rounded.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Wildy-Sans.ttf */ "./src/fonts/Wildy-Sans.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: title-font;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n  font-family: todo-font;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n@font-face {\n  font-family: wavy-font;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n}\n\n/* General page setup */\nhtml, \nbody {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  background-color: rgb(246, 246, 243);\n}\n\n/* Page header styling */\n#page-header {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  margin-top: 0;\n  padding: 10px;\n}\n\n#title-menu-drop {\n  display: flex;\n  align-items: center;\n  padding: 10px;\n}\n\n.menu-dropper {\n  visibility: hidden;\n}\n\n#page-header h1 {\n  font-family: title-font;\n  font-size: 55px;\n  color: white;\n  margin: 0 auto;\n  text-align: center;\n}\n\n#page-header span {\n  font-size: 60px;\n  text-shadow: 20px -15px 15px rgba(255, 255, 255, 1);;\n}\n\n#logo-and-statement {\n  text-align: right;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n}\n\n.logo-small {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-bounce-land-scale-x: 1.5;\n  --fa-animation-iteration-count: 1;\n}\n\n.logo-mid {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-animation-iteration-count: 1;\n}\n\n.logo-large {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-animation-iteration-count: 1;\n}\n\n#page-header h2 {\n  margin-left: auto;\n  text-align: right;\n  margin: 0 auto;\n  display: inline-block;\n  color: white;\n}\n\n#page-body {\n  display: flex;\n  height: 91vh;\n}\n\n/* Side menu styling */\n#side-menu {\n  background-color: rgb(246, 246, 243);\n  height: 100%;\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  overflow: scroll;\n}\n\n/* Top part of side menu with timeline divs */\n#timelines {\n  width: 100%;\n  margin: 20px auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 50px;\n}\n\n.timeline-div {\n  width: 80%;\n  background-color: white;\n  border: 1px solid rgb(107, 102, 102);\n  border-radius: 5px;\n  padding: 10px;\n  margin-top: 12.5px;\n  margin-bottom: 12.5px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  transition: .5s ease-in-out;\n}\n\n.current-list-view {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n}\n\n.timeline-div:hover {\n  border: 1px solid rgb(134, 8, 8);\n  background-color: rgb(243, 221, 221);\n  box-shadow: 7px -2px 17px -7px rgba(0,0,0,0.38);\n}\n\n.timeline-div span {\n  font-family: todo-font;\n  font-size: 22px;\n}\n\n\n#projects {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#projects-title {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n  width: 100%;\n  height: 50px;\n  line-height: 0px;\n  padding: 0;\n  text-align: center;\n}\n\n#projects-title h2 {\n  font-family: title-font;\n  font-size: 30px;\n}\n\n#projects-title span {\n  font-family: wavy-font;\n  font-size: 35px;\n}\n\n#add-project-organizer {\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n#add-project-organizer:hover {\n  transform: rotate(360deg);\n}\n\n#projects-line {\n  margin-top: 20px;\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n/* Bottom of side menu project area */\n.project {\n  width: 80%;\n  background-color: white;\n  border: 1px solid rgb(107, 102, 102);\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 10px;\n  padding: 10px;\n  cursor: pointer;\n  transition: .5s ease-in-out;\n}\n\n.project:hover {\n  border: 1px solid rgb(134, 8, 8);\n  background-color: rgb(246, 242, 242);\n  box-shadow: 7px -2px 17px -7px rgba(0,0,0,0.38);\n\n}\n\n.project-name {\n  font-family: todo-font;\n  font-size: 20px;\n  width: 60%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-left: 5px;\n}\n\n.fa-pen-to-square:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-trash:hover {\n  cursor: pointer;\n  font-size: 18px;\n}\n\n\n/* Form for entering and editing project containers */\n#project-form {\n  width: 400px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#project-form label {\n  font-size: 30px;\n}\n\n#project-form-line {\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#project-form-footer {\n  margin: 0 auto;\n  width: 90%;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-bottom: 10px;\n}\n\n#project-form-closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#project-title-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 20px;\n}\n\n#project-title-input {\n  height: 20px;\n  min-height: 20px;\n  max-height: 20px;\n  max-width: 98%;\n  min-width: 98%;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n}\n\n\n/* Main part of page with todo list */\n#todo-lists {\n  width: 85%;\n  border-left: 1px solid rgb(168, 26, 26);\n  background-color: rgb(231, 227, 227);\n  overflow: scroll;\n}\n\n#todo-container {\n  width: 85%;\n  background-color: rgb(231, 227, 227);\n  overflow: scroll;\n  margin: 0 auto;\n}\n\n#list-name {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgb(34, 26, 26);\n  gap: 20px;\n  font-size: 25px;\n}\n\n#list-name h1 {\n  font-family: title-font;\n  font-size: 50px;\n}\n\n#list-line {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n  width: 60%;\n  border-bottom: 2px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#list-line h3 {\n  font-family: wavy-font;\n  font-size: 30px;\n}\n\n#add-todo {\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n#add-todo:hover {\n  transform: rotate(360deg);\n}\n\n/* Part of main page under line that houses todo list */\n.todo {\n  background-color: rgb(251, 242, 242);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n  width: 60%;\n  border: 1px solid rgb(173, 167, 167);\n  border-radius: 5px;\n  margin: 23px auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.medium-priority {\n  background: rgb(226, 145, 145);\n  background: linear-gradient(105deg, rgba(235, 78, 78, 0.926) 16%, rgba(236, 89, 78, 0.758) 97%);\n  color: rgb(49, 48, 48);\n}\n\n.high-priority {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n}\n\n.checkbox-and-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.fa-square-check:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-square:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.checkbox-and-title p {\n  font-family: todo-font;\n  font-size: 20px;\n}\n\n.date-icons-for-editing {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n\n.fa-trash-can:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-circle-info:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n/* Tint added when forms are openned */\n.tint {\n  background:\n    black,\n    linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5));\n  filter: brightness(50%);\n}\n \n/* To do entry form */\n#todo-form {\n  width: 400px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#todo-form label {\n  font-size: 30px;\n}\n\n/* style that makes forms disapear */\n.invisible {\n  visibility: hidden;\n}\n\n.form-topper {\n  display: flex;\n  justify-content: space-between;\n  border-radius: 2%;\n  width: 100%;\n  height: 15%;\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n}\n\n.task-label {\n  padding: 0;\n  flex: 1;\n}\n\n.task-label h2 {\n  margin-left: 5%;\n  font-size: 30px;\n  color: white;\n}\n\n#closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#title-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 20px;\n}\n\n#title-input {\n  height: 40px;\n  min-height: 40px;\n  max-height: 40px;\n  max-width: 98%;\n  min-width: 98%;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n}\n\n#notes-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 20px auto 20px auto;\n  font-size: 20px;\n}\n\n#notes-input {\n  font-size: 15px;\n  max-width: 98%;\n  max-height: 100px;\n  min-width: 98%;\n  min-height: 100px;\n  text-align: left;\n}\n\n#deadline-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 30px auto 20px auto;\n  font-size: 20px;\n}\n\n#deadline-input {\n  height: 40px;\n}\n\n#priority-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 30px auto 20px auto;\n  font-size: 20px;\n}\n\n#priority-input {\n  height: 40px;\n}\n\n#form-line {\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#form-footer {\n  margin: 0 auto;\n  width: 90%;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-bottom: 10px;\n}\n\n.form-button {\n  height: 40px;\n  width: 100px;\n  border-radius: 5%;\n  border: 2px solid rgb(51, 9, 9);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 25px;\n  background-color: white;\n  cursor: pointer;\n}\n\n/* Screen for viewing details about a to do */\n#todo-info {\n  display: flex;\n  flex-direction: column;\n  width: 500px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#todo-info h2 {\n  font-size: 40px;\n}\n\n#todo-info p {\n  font-size: 25px;\n  margin: 10px;\n}\n\n\n#info-closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#info-title-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-title-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-notes-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-notes-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-deadline-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-deadline-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-priority-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-priority-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* re-styling for larger screened portable viewports */\n@media only screen and (max-width: 1000px) {\n  #page-header h1 {\n    font-size: 40px;\n  }\n\n  #side-menu {\n    visibility: hidden;\n    width: 0;\n    height: 0;\n  }\n\n  .show-side-menu {\n    visibility: visible !important;\n    height: 91% !important;\n    width: 300px !important;\n    z-index: 1 !important;\n    position: absolute;\n  }\n\n  #todo-lists {\n    width: 100%;\n  }\n\n  #todo-container {\n    width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  #list-line {\n    width: 80%;\n   \n  }\n\n  .menu-dropper {\n    visibility: visible;\n    color: white;\n    border: 3px solid white;\n    border-radius: 5px;\n    padding: 15px 5px;\n    cursor: pointer;\n  }\n\n \n}\n\n/* Styling for mid sized phones */\n@media only screen and (max-width: 500px) {\n  .logo-mid {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-animation-iteration-count: 1;\n    font-size: 20px;\n  }\n  \n  .logo-large {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-animation-iteration-count: 1;\n    font-size: 25px;\n  }\n\n  .todo {\n    background-color: rgb(251, 242, 242);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-top: 20px;\n    width: 80%;\n    border: 1px solid rgb(173, 167, 167);\n    border-radius: 5px;\n    margin: 23px auto;\n    padding: 5px;\n  }\n\n  .todo p {\n    font-size: 12px;\n  }\n\n  #todo-info {\n    width: 100%;\n  }\n  \n  .checkbox-and-title {\n    width: 40%;\n    text-overflow: ellipsis;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n  }\n\n  .checkbox-and-title p {\n    text-overflow: ellipsis !important;\n    white-space: nowrap;\n    overflow: hidden;\n  }\n  \n  .date-icons-for-editing {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n  }\n}\n\n/* Styling for small screens */\n@media only screen and (max-width: 330px) {\n  #page-header h1 {\n    color: white;\n    margin: 0 auto;\n    text-align: center;\n    font-size: 25px;\n  }\n\n  #page-header span {\n    font-size: 30px;\n  }\n\n  .menu-dropper {\n    font-size: 20px;\n  }\n\n  .logo-small {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-bounce-land-scale-x: 1.5;\n    --fa-animation-iteration-count: 1;\n    font-size: 15px;\n  }\n\n  #list-line {\n    width: 90%;\n   \n  }\n  \n  #todo-form {\n    width: 240px;\n    border-radius: 2%;\n    color: rgb(107, 102, 102);\n    box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n    font-family: todo-font;\n    margin: 0 auto;\n    z-index: 1;\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: rgb(230, 229, 224);\n  }\n\n  #todo-info {\n    display: flex;\n    flex-direction: column;\n    width: 250px;\n    height: 100%;\n    border-radius: 2%;\n    color: rgb(107, 102, 102);\n    box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n    font-family: todo-font;\n    margin: 0 auto;\n    z-index: 1;\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: rgb(230, 229, 224);\n  }\n\n  #todo-info h2 {\n    font-size: 30px;\n    margin: 3px;\n    line-height: 70px;\n  }\n\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: title-font;\n  src: url(./fonts/Whitelist-Demo.otf);\n}\n\n@font-face {\n  font-family: todo-font;\n  src: url(./fonts/hlmt-rounded.ttf);\n}\n\n@font-face {\n  font-family: wavy-font;\n  src: url(./fonts/Wildy-Sans.ttf);\n}\n\n/* General page setup */\nhtml, \nbody {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  background-color: rgb(246, 246, 243);\n}\n\n/* Page header styling */\n#page-header {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  margin-top: 0;\n  padding: 10px;\n}\n\n#title-menu-drop {\n  display: flex;\n  align-items: center;\n  padding: 10px;\n}\n\n.menu-dropper {\n  visibility: hidden;\n}\n\n#page-header h1 {\n  font-family: title-font;\n  font-size: 55px;\n  color: white;\n  margin: 0 auto;\n  text-align: center;\n}\n\n#page-header span {\n  font-size: 60px;\n  text-shadow: 20px -15px 15px rgba(255, 255, 255, 1);;\n}\n\n#logo-and-statement {\n  text-align: right;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n}\n\n.logo-small {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-bounce-land-scale-x: 1.5;\n  --fa-animation-iteration-count: 1;\n}\n\n.logo-mid {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-animation-iteration-count: 1;\n}\n\n.logo-large {\n  color: white;\n  --fa-animation-duration: 2.1s;\n  --fa-animation-iteration-count: 1;\n}\n\n#page-header h2 {\n  margin-left: auto;\n  text-align: right;\n  margin: 0 auto;\n  display: inline-block;\n  color: white;\n}\n\n#page-body {\n  display: flex;\n  height: 91vh;\n}\n\n/* Side menu styling */\n#side-menu {\n  background-color: rgb(246, 246, 243);\n  height: 100%;\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  overflow: scroll;\n}\n\n/* Top part of side menu with timeline divs */\n#timelines {\n  width: 100%;\n  margin: 20px auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 50px;\n}\n\n.timeline-div {\n  width: 80%;\n  background-color: white;\n  border: 1px solid rgb(107, 102, 102);\n  border-radius: 5px;\n  padding: 10px;\n  margin-top: 12.5px;\n  margin-bottom: 12.5px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  transition: .5s ease-in-out;\n}\n\n.current-list-view {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n}\n\n.timeline-div:hover {\n  border: 1px solid rgb(134, 8, 8);\n  background-color: rgb(243, 221, 221);\n  box-shadow: 7px -2px 17px -7px rgba(0,0,0,0.38);\n}\n\n.timeline-div span {\n  font-family: todo-font;\n  font-size: 22px;\n}\n\n\n#projects {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#projects-title {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n  width: 100%;\n  height: 50px;\n  line-height: 0px;\n  padding: 0;\n  text-align: center;\n}\n\n#projects-title h2 {\n  font-family: title-font;\n  font-size: 30px;\n}\n\n#projects-title span {\n  font-family: wavy-font;\n  font-size: 35px;\n}\n\n#add-project-organizer {\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n#add-project-organizer:hover {\n  transform: rotate(360deg);\n}\n\n#projects-line {\n  margin-top: 20px;\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n/* Bottom of side menu project area */\n.project {\n  width: 80%;\n  background-color: white;\n  border: 1px solid rgb(107, 102, 102);\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 10px;\n  padding: 10px;\n  cursor: pointer;\n  transition: .5s ease-in-out;\n}\n\n.project:hover {\n  border: 1px solid rgb(134, 8, 8);\n  background-color: rgb(246, 242, 242);\n  box-shadow: 7px -2px 17px -7px rgba(0,0,0,0.38);\n\n}\n\n.project-name {\n  font-family: todo-font;\n  font-size: 20px;\n  width: 60%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-left: 5px;\n}\n\n.fa-pen-to-square:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-trash:hover {\n  cursor: pointer;\n  font-size: 18px;\n}\n\n\n/* Form for entering and editing project containers */\n#project-form {\n  width: 400px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#project-form label {\n  font-size: 30px;\n}\n\n#project-form-line {\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#project-form-footer {\n  margin: 0 auto;\n  width: 90%;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-bottom: 10px;\n}\n\n#project-form-closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#project-title-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 20px;\n}\n\n#project-title-input {\n  height: 20px;\n  min-height: 20px;\n  max-height: 20px;\n  max-width: 98%;\n  min-width: 98%;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n}\n\n\n/* Main part of page with todo list */\n#todo-lists {\n  width: 85%;\n  border-left: 1px solid rgb(168, 26, 26);\n  background-color: rgb(231, 227, 227);\n  overflow: scroll;\n}\n\n#todo-container {\n  width: 85%;\n  background-color: rgb(231, 227, 227);\n  overflow: scroll;\n  margin: 0 auto;\n}\n\n#list-name {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgb(34, 26, 26);\n  gap: 20px;\n  font-size: 25px;\n}\n\n#list-name h1 {\n  font-family: title-font;\n  font-size: 50px;\n}\n\n#list-line {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n  width: 60%;\n  border-bottom: 2px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#list-line h3 {\n  font-family: wavy-font;\n  font-size: 30px;\n}\n\n#add-todo {\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n#add-todo:hover {\n  transform: rotate(360deg);\n}\n\n/* Part of main page under line that houses todo list */\n.todo {\n  background-color: rgb(251, 242, 242);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 20px;\n  width: 60%;\n  border: 1px solid rgb(173, 167, 167);\n  border-radius: 5px;\n  margin: 23px auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.medium-priority {\n  background: rgb(226, 145, 145);\n  background: linear-gradient(105deg, rgba(235, 78, 78, 0.926) 16%, rgba(236, 89, 78, 0.758) 97%);\n  color: rgb(49, 48, 48);\n}\n\n.high-priority {\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n  color: white;\n}\n\n.checkbox-and-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.fa-square-check:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-square:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.checkbox-and-title p {\n  font-family: todo-font;\n  font-size: 20px;\n}\n\n.date-icons-for-editing {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n\n.fa-trash-can:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.fa-circle-info:hover {\n  cursor: pointer;\n  font-size: 22px;\n}\n\n/* Tint added when forms are openned */\n.tint {\n  background:\n    black,\n    linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5));\n  filter: brightness(50%);\n}\n \n/* To do entry form */\n#todo-form {\n  width: 400px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#todo-form label {\n  font-size: 30px;\n}\n\n/* style that makes forms disapear */\n.invisible {\n  visibility: hidden;\n}\n\n.form-topper {\n  display: flex;\n  justify-content: space-between;\n  border-radius: 2%;\n  width: 100%;\n  height: 15%;\n  background: rgb(148,36,36);\n  background: linear-gradient(105deg, rgba(148,36,36,0.9262079831932774) 16%, rgba(241,24,10,0.758140756302521) 97%);\n}\n\n.task-label {\n  padding: 0;\n  flex: 1;\n}\n\n.task-label h2 {\n  margin-left: 5%;\n  font-size: 30px;\n  color: white;\n}\n\n#closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#title-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 20px;\n}\n\n#title-input {\n  height: 40px;\n  min-height: 40px;\n  max-height: 40px;\n  max-width: 98%;\n  min-width: 98%;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n}\n\n#notes-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 20px auto 20px auto;\n  font-size: 20px;\n}\n\n#notes-input {\n  font-size: 15px;\n  max-width: 98%;\n  max-height: 100px;\n  min-width: 98%;\n  min-height: 100px;\n  text-align: left;\n}\n\n#deadline-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 30px auto 20px auto;\n  font-size: 20px;\n}\n\n#deadline-input {\n  height: 40px;\n}\n\n#priority-div {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  margin: 30px auto 20px auto;\n  font-size: 20px;\n}\n\n#priority-input {\n  height: 40px;\n}\n\n#form-line {\n  width: 90%;\n  border-top: .5px solid rgb(173, 167, 167);\n  margin: 23px auto;\n  opacity: .6;\n}\n\n#form-footer {\n  margin: 0 auto;\n  width: 90%;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-bottom: 10px;\n}\n\n.form-button {\n  height: 40px;\n  width: 100px;\n  border-radius: 5%;\n  border: 2px solid rgb(51, 9, 9);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 25px;\n  background-color: white;\n  cursor: pointer;\n}\n\n/* Screen for viewing details about a to do */\n#todo-info {\n  display: flex;\n  flex-direction: column;\n  width: 500px;\n  border-radius: 2%;\n  color: rgb(107, 102, 102);\n  box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n  font-family: todo-font;\n  margin: 0 auto;\n  z-index: 1;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgb(230, 229, 224);\n}\n\n#todo-info h2 {\n  font-size: 40px;\n}\n\n#todo-info p {\n  font-size: 25px;\n  margin: 10px;\n}\n\n\n#info-closing-button {\n  color: white;\n  cursor: pointer;\n  line-height: 5px;\n  font-size: 30px;\n  padding: 10px;\n}\n\n#info-title-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-title-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-notes-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-notes-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-deadline-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-deadline-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#info-priority-div {\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  width: 90%;\n  margin: 10px auto 20px auto;\n  font-size: 40px;\n}\n\n#info-priority-input {\n  border: 1px solid rgb(128, 33, 33);\n  border-radius: 10px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* re-styling for larger screened portable viewports */\n@media only screen and (max-width: 1000px) {\n  #page-header h1 {\n    font-size: 40px;\n  }\n\n  #side-menu {\n    visibility: hidden;\n    width: 0;\n    height: 0;\n  }\n\n  .show-side-menu {\n    visibility: visible !important;\n    height: 91% !important;\n    width: 300px !important;\n    z-index: 1 !important;\n    position: absolute;\n  }\n\n  #todo-lists {\n    width: 100%;\n  }\n\n  #todo-container {\n    width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  #list-line {\n    width: 80%;\n   \n  }\n\n  .menu-dropper {\n    visibility: visible;\n    color: white;\n    border: 3px solid white;\n    border-radius: 5px;\n    padding: 15px 5px;\n    cursor: pointer;\n  }\n\n \n}\n\n/* Styling for mid sized phones */\n@media only screen and (max-width: 500px) {\n  .logo-mid {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-animation-iteration-count: 1;\n    font-size: 20px;\n  }\n  \n  .logo-large {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-animation-iteration-count: 1;\n    font-size: 25px;\n  }\n\n  .todo {\n    background-color: rgb(251, 242, 242);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-top: 20px;\n    width: 80%;\n    border: 1px solid rgb(173, 167, 167);\n    border-radius: 5px;\n    margin: 23px auto;\n    padding: 5px;\n  }\n\n  .todo p {\n    font-size: 12px;\n  }\n\n  #todo-info {\n    width: 100%;\n  }\n  \n  .checkbox-and-title {\n    width: 40%;\n    text-overflow: ellipsis;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n  }\n\n  .checkbox-and-title p {\n    text-overflow: ellipsis !important;\n    white-space: nowrap;\n    overflow: hidden;\n  }\n  \n  .date-icons-for-editing {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n  }\n}\n\n/* Styling for small screens */\n@media only screen and (max-width: 330px) {\n  #page-header h1 {\n    color: white;\n    margin: 0 auto;\n    text-align: center;\n    font-size: 25px;\n  }\n\n  #page-header span {\n    font-size: 30px;\n  }\n\n  .menu-dropper {\n    font-size: 20px;\n  }\n\n  .logo-small {\n    color: white;\n    --fa-animation-duration: 2.1s;\n    --fa-bounce-land-scale-x: 1.5;\n    --fa-animation-iteration-count: 1;\n    font-size: 15px;\n  }\n\n  #list-line {\n    width: 90%;\n   \n  }\n  \n  #todo-form {\n    width: 240px;\n    border-radius: 2%;\n    color: rgb(107, 102, 102);\n    box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n    font-family: todo-font;\n    margin: 0 auto;\n    z-index: 1;\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: rgb(230, 229, 224);\n  }\n\n  #todo-info {\n    display: flex;\n    flex-direction: column;\n    width: 250px;\n    height: 100%;\n    border-radius: 2%;\n    color: rgb(107, 102, 102);\n    box-shadow: 2px 5px 16px 8px rgba(0,0,0,0.31);\n    font-family: todo-font;\n    margin: 0 auto;\n    z-index: 1;\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: rgb(230, 229, 224);\n  }\n\n  #todo-info h2 {\n    font-size: 30px;\n    margin: 3px;\n    line-height: 70px;\n  }\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/constants/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/constants/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daysInWeek": () => (/* binding */ daysInWeek),
/* harmony export */   "maxTime": () => (/* binding */ maxTime),
/* harmony export */   "millisecondsInMinute": () => (/* binding */ millisecondsInMinute),
/* harmony export */   "millisecondsInHour": () => (/* binding */ millisecondsInHour),
/* harmony export */   "millisecondsInSecond": () => (/* binding */ millisecondsInSecond),
/* harmony export */   "minTime": () => (/* binding */ minTime),
/* harmony export */   "minutesInHour": () => (/* binding */ minutesInHour),
/* harmony export */   "monthsInQuarter": () => (/* binding */ monthsInQuarter),
/* harmony export */   "monthsInYear": () => (/* binding */ monthsInYear),
/* harmony export */   "quartersInYear": () => (/* binding */ quartersInYear),
/* harmony export */   "secondsInHour": () => (/* binding */ secondsInHour),
/* harmony export */   "secondsInMinute": () => (/* binding */ secondsInMinute)
/* harmony export */ });
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
var daysInWeek = 7;
/**
 * Maximum allowed time.
 *
 * @name maxTime
 * @constant
 * @type {number}
 * @default
 */

var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInMinute = 60000;
/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInHour = 3600000;
/**
 * Milliseconds in 1 second
 *
 * @name millisecondsInSecond
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInSecond = 1000;
/**
 * Minimum allowed time.
 *
 * @name minTime
 * @constant
 * @type {number}
 * @default
 */

var minTime = -maxTime;
/**
 * Minutes in 1 hour
 *
 * @name minutesInHour
 * @constant
 * @type {number}
 * @default
 */

var minutesInHour = 60;
/**
 * Months in 1 quarter
 *
 * @name monthsInQuarter
 * @constant
 * @type {number}
 * @default
 */

var monthsInQuarter = 3;
/**
 * Months in 1 year
 *
 * @name monthsInYear
 * @constant
 * @type {number}
 * @default
 */

var monthsInYear = 12;
/**
 * Quarters in 1 year
 *
 * @name quartersInYear
 * @constant
 * @type {number}
 * @default
 */

var quartersInYear = 4;
/**
 * Seconds in 1 hour
 *
 * @name secondsInHour
 * @constant
 * @type {number}
 * @default
 */

var secondsInHour = 3600;
/**
 * Seconds in 1 minute
 *
 * @name secondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var secondsInMinute = 60;

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameMonth/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameMonth/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameMonth)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month (and year)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */

function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week (and month and year)
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 * 
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * var result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight, dirtyOptions);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisMonth/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisMonth/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisMonth)
/* harmony export */ });
/* harmony import */ var _isSameMonth_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameMonth/index.js */ "./node_modules/date-fns/esm/isSameMonth/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isThisMonth
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * var result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */

function isThisMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameMonth_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Date.now(), dirtyDate);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameWeek/index.js */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/parseISO/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/parseISO/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/index.js */ "./node_modules/date-fns/esm/constants/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? 2 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: NaN,
    restDateString: ''
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null; // either year or century is null, not both

  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Whitelist-Demo.otf":
/*!**************************************!*\
  !*** ./src/fonts/Whitelist-Demo.otf ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "84e6147bc4018047fc0a.otf";

/***/ }),

/***/ "./src/fonts/Wildy-Sans.ttf":
/*!**********************************!*\
  !*** ./src/fonts/Wildy-Sans.ttf ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ac72a0fdcc21163b7ae5.ttf";

/***/ }),

/***/ "./src/fonts/hlmt-rounded.ttf":
/*!************************************!*\
  !*** ./src/fonts/hlmt-rounded.ttf ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e8ca73cc299b479a8074.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map