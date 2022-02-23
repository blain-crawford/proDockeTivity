import { toDoForm, toDoList, addToDoListItemToThingsToDo } from './forms.js';

class Project {
  constructor (title, projectContainer) {
    this.title = title;
    this.projectContainer = projectContainer;
  }
};


const projectInteractions = (() => {
  const currentProject = document.querySelector('#current-project');
  let projectList = document.querySelectorAll('.project-name');
  const projectsArray = [];
 
  const populateProjectOrganizers = (projectObject, toDoObject) => {
      for(let toDo in toDoObject) {
        if(typeof toDoObject[toDo] === 'string') {  
          let currentToDo = JSON.parse(toDoObject[toDo]);
            if(projectObject.title === currentToDo.project) {
              projectObject.projectContainer.push(currentToDo);
            }
        }
    }
  }


  const chooseProject = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    for(let i = 0; i < projectList.length; i++) {
      let currentProject = projectsArray[i];
      if(currentProject.title === this.innerText) {
          toDoForm.addToDoListItemToThingsToDo(currentProject.projectContainer);
      }
    }
  }

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

  createProjectOrganizers();
  
  projectList.forEach(project => {
    project.addEventListener('click', chooseProject, false);
  });

  return {createProjectOrganizers, populateProjectOrganizers, projectsArray}

})();

export { projectInteractions, Project }