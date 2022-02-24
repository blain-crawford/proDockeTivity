import { toDoForm, toDoList, addToDoListItemToThingsToDo, projectForm } from './forms.js';
import { storageAvailable, autoPopulateThingsToDo, autoPopulateProjects } from './index.js'

class Project {
  constructor (title, projectContainer) {
    this.title = title;
    this.projectContainer = projectContainer;
  }
};


const projectInteractions = (() => {
  const projectsContainerDiv = document.querySelector('#projects');
  const currentProject = document.querySelector('#current-project');
  const addButton = document.querySelector('#add-project');
  const titleInputDiv = document.querySelector('#project-title-input');
  const editProjectFormTitle = document.querySelector('#project-form-title');
  let projectList = document.querySelectorAll('.project-name');
  const projectDeleteButtons = document.querySelectorAll('.fa-trash')
  let projectsArray = [];

  const clearProjectContainerDivBeforeRepopulation = function () {
    projectsContainerDiv.innerHTML = '';
  }

  const fillProjectsArray = function () {
    if (localStorage.projectsArray) {
      if(projectsArray.length >= 0) {
        while(projectsArray.length > 0) {
          projectsArray.pop();
        }
        for(let i = 0; i < JSON.parse(localStorage.projectsArray).length; i++) {
          projectsArray.push(JSON.parse(localStorage.projectsArray)[i]);
        }
      }
    } else {
      return;
    }
  };

  const addprojectsArrayToLocalStorage = function () {
    if(storageAvailable('localStorage')) {
      if(!localStorage.getItem(projectsArray)) {
        localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
      } else {
        localStorage.removeItem('projectsArray')
        localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
      }
    }
    fillProjectsArray();
    
  };
  

  const populateProjectOrganizers = (projectObject, toDoObject) => {
      for(let toDo in toDoObject) {
        if(typeof toDoObject[toDo] === 'string' && toDo !== projectsArray) {  
          let currentToDo = JSON.parse(toDoObject[toDo]);
            if(projectObject.title === currentToDo.project) {
              projectObject.projectContainer.push(currentToDo);
            }
        }
    }
  };


  const chooseProject = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    for(let i = 0; i < projectList.length; i++) {
      let currentProject = projectsArray[i];
      if(currentProject.title === this.innerText) {
          toDoForm.addToDoListItemToThingsToDo(currentProject.projectContainer);
      }
    }
  };

  const createProjectOrganizers = () => {
    projectList = document.querySelectorAll('.project-name');
    if(projectsArray.length > 0) {
      while(projectsArray.length > 0) {
        projectsArray.pop();
      }
    }
    if(projectList.length > 0) {
      projectList.forEach(project => {
        let projectOrganizer = new Project(project.innerText, []);
        populateProjectOrganizers(projectOrganizer, localStorage);
        projectsArray.push(projectOrganizer);
        project.addEventListener('click', chooseProject, false);
      })
    };
    
  };

  const changeTitle = function () {
    let titleToChange = editProjectFormTitle.textContent
    addButton.innerText = 'Add'
    for(let i = 0; i < projectsArray.length; i++) {
      if(projectsArray[i].title === titleToChange) {
        projectsArray[i].title = titleInputDiv.value;
        for (let j = 0; j < projectsArray[i].projectContainer.length; j++) {
          let currentToDo = projectsArray[i].projectContainer[j];
          currentToDo.project = titleInputDiv.value;
          localStorage.removeItem(currentToDo.title);
          localStorage.setItem(`${currentToDo.title}`, JSON.stringify(currentToDo))
          console.log(projectsArray);
        }
      }
    }

    addButton.removeEventListener('click', changeTitle);
    addButton.addEventListener('click', projectForm.createNewProjectOrganizer, false);

    clearProjectContainerDivBeforeRepopulation();
    addprojectsArrayToLocalStorage();
    autoPopulateProjects();
    projectForm.closeProjectForm();
  };

  const showEditProjectTitleForm = function () {
    let projectOrganizerToEdit = this.parentElement.querySelector(':nth-child(2)').innerText
    editProjectFormTitle.firstChild.textContent = projectOrganizerToEdit
    
    
    addButton.innerText = 'Edit Title';
    titleInputDiv.value = projectOrganizerToEdit;

    addButton.removeEventListener('click', projectForm.createNewProjectOrganizer);
    addButton.addEventListener('click', changeTitle, false);
    projectForm.openProjectForm();
  };

  const deleteProject = function () {
    let projectOrganizerToDelete = this.parentElement.querySelector(':nth-child(2)').innerText
    for(let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].title === projectOrganizerToDelete) {
        let currentProjectContainer = projectsArray[i].projectContainer
        for(let j = 0; j < currentProjectContainer.length; j++) {
          if(localStorage.getItem(currentProjectContainer[j].title) !== null) {
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
  };

  createProjectOrganizers();
  
  projectList.forEach(project => {
    project.addEventListener('click', chooseProject, false);
  });

  projectDeleteButtons.forEach(button => {
    button.addEventListener('click', deleteProject, false);
  })

  return {createProjectOrganizers, populateProjectOrganizers, projectsArray, addprojectsArrayToLocalStorage, 
    fillProjectsArray, deleteProject, showEditProjectTitleForm}

})();

export { projectInteractions, Project }