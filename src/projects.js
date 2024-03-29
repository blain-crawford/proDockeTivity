import {
  toDoForm,
  toDoList,
  addToDoListItemToThingsToDo,
  projectForm,
  clearThingsToDoBeforeRepopulation,
} from './forms.js';

import {
  storageAvailable,
  autoPopulateThingsToDo,
  autoPopulateProjects,
} from './index.js';

class Project {
  constructor(title, projectContainer) {
    this.title = title;
    this.projectContainer = projectContainer;
  }
}

const projectInteractions = (() => {
  // Select DOM elements in project Section of App
  const currentProjectH1 = document.querySelector('#current-project');
  const projectsContainerDiv = document.querySelector('#projects');
  const currentProject = document.querySelector('#current-project');
  const addButton = document.querySelector('#add-project');
  const titleInputDiv = document.querySelector('#project-title-input');
  const editProjectFormTitle = document.querySelector('#project-form-title');
  let projectList = document.querySelectorAll('.project-name');
  const projectDeleteButtons = document.querySelectorAll('.fa-trash');
  const timeLineDivs = document.querySelectorAll('.timeline-div');
  const allTimeLine = document.querySelector('#all');

  // Creates array for holding all projects
  let projectsArray = [];

  //Alter background color of project you're currently viewing
  const showSelectedProject = function (project) {
    timeLineDivs.forEach((div) => {
      div.classList.remove('current-list-view');
    });
    projectList.forEach((project) => {
      project.parentElement.classList.remove('current-list-view');
    });

    project.parentElement.classList.add('current-list-view');
  };

  /**
   * Clears side Menu project container before repopulating after projectArray change
   */
  const clearProjectContainerDivBeforeRepopulation = function () {
    projectsContainerDiv.innerHTML = '';
  };

  /**
   * When session is opened this fills projectsArray from localMemory
   * @returns
   */
  const fillProjectsArray = function () {
    if (localStorage.projectsArray) {
      if (projectsArray.length >= 0) {
        while (projectsArray.length > 0) {
          projectsArray.pop();
        }
        for (let i = 0; i < JSON.parse(localStorage.projectsArray).length; i++) {
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
  const addprojectsArrayToLocalStorage = function () {
    if (storageAvailable('localStorage')) {
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
  const populateProjectOrganizers = (projectObject, toDoObject) => {
    for (let toDo in toDoObject) {
      if (typeof toDoObject[toDo] === 'string' && toDo !== projectsArray) {
        let currentToDo = JSON.parse(toDoObject[toDo]);
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
  const chooseProject = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation();
    for (let i = 0; i < projectList.length; i++) {
      let currentProject = projectsArray[i];
      if (currentProject.title === this.innerText) {
        toDoForm.addToDoListItemToThingsToDo(currentProject.projectContainer);
      }
    }
    showSelectedProject(this);
  };

  /**
   * Checks to see if there are any projects in projects arrary
   * And populates the sideMedu projects session with them, as well
   * as filling projectsArray with project objects
   */
  const createProjectOrganizers = () => {
    projectList = document.querySelectorAll('.project-name');

    if (projectsArray.length > 0) {
      while (projectsArray.length > 0) {
        projectsArray.pop();
      }
    }

    if (projectList.length > 0) {
      projectList.forEach((project) => {
        let projectOrganizer = new Project(project.innerText, []);
        populateProjectOrganizers(projectOrganizer, localStorage);
        projectsArray.push(projectOrganizer);
        project.addEventListener('click', chooseProject, false);
      });
    }
  };

  /**
   * Changes the title of a projectContainer/ProjectObject and re-renders app
   */
  const changeTitle = function () {
    let titleToChange = editProjectFormTitle.textContent;
    addButton.innerText = 'Add';

    for (let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].title === titleToChange) {
        projectsArray[i].title = titleInputDiv.value;

        for (let j = 0; j < projectsArray[i].projectContainer.length; j++) {
          let currentToDo = projectsArray[i].projectContainer[j];
          currentToDo.project = titleInputDiv.value;
          localStorage.removeItem(currentToDo.title);
          localStorage.setItem(`${currentToDo.title}`,JSON.stringify(currentToDo));
        }
      }
    }

    currentProjectH1.textContent = titleInputDiv.value;
    addButton.removeEventListener('click', changeTitle);
    addButton.addEventListener('click', projectForm.createNewProjectOrganizer, false);

    //Rerender App
    clearProjectContainerDivBeforeRepopulation();
    addprojectsArrayToLocalStorage();
    autoPopulateThingsToDo();
    autoPopulateProjects();
    projectForm.closeProjectForm();
  };

  /**
   * Opens up form for altering project title
   */
  const showEditProjectTitleForm = function () {
    let projectOrganizerToEdit = this.parentElement.querySelector(':nth-child(2)').innerText;

    editProjectFormTitle.firstChild.textContent = projectOrganizerToEdit;
    addButton.innerText = 'Edit Title';
    titleInputDiv.value = projectOrganizerToEdit;

    //change event listeners
    addButton.removeEventListener('click', projectForm.createNewProjectOrganizer);
    addButton.addEventListener('click', changeTitle, false);
    projectForm.openProjectForm();
  };

  /**
   * Deletes a project, clears it's toDos from the local storage
   * Then re-renders app with updated info
   */
  const deleteProject = function () {
    let projectOrganizerToDelete =
      this.parentElement.querySelector(':nth-child(2)').innerText;

    for (let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].title === projectOrganizerToDelete) {
        let currentProjectContainer = projectsArray[i].projectContainer;
        for (let j = 0; j < currentProjectContainer.length; j++) {
          if (localStorage.getItem(currentProjectContainer[j].title) !== null) {
            localStorage.removeItem(currentProjectContainer[j].title);
          }
        }
        projectsArray.splice(i, 1);
      }
    }
    clearProjectContainerDivBeforeRepopulation();
    addprojectsArrayToLocalStorage();
    autoPopulateProjects();
    autoPopulateThingsToDo();
    currentProject.innerText = 'All';
    allTimeLine.classList.add('current-list-view');
  };

  createProjectOrganizers();

  /**
   * Adds necessary event listeners
   */
  projectList.forEach((project) => {
    project.addEventListener('click', chooseProject, false);
  });

  projectDeleteButtons.forEach((button) => {
    button.addEventListener('click', deleteProject, false);
  });

  return {
    createProjectOrganizers,
    populateProjectOrganizers,
    projectsArray,
    addprojectsArrayToLocalStorage,
    fillProjectsArray,
    deleteProject,
    showEditProjectTitleForm,
    clearProjectContainerDivBeforeRepopulation,
    showSelectedProject,
  };
})();

export { projectInteractions, Project };
