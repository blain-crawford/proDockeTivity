import { toDoForm, toDoList, addToDoListItemToThingsToDo } from './forms.js';

class Project {
  constructor (title, projectContainer) {
    this.title = title;
    this.projectContainer = projectContainer;
  }
}
const projectInteractions = (() => {
  const currentProject = document.querySelector('#current-project');
  const projectList = document.querySelectorAll('.project-name');
 

  const populateProjectOrganizers = (projectArray, toDoObject) => {
      //
  }

  const createProjectOrganizers = (() => {
    if(projectList.length > 0) {
      projectList.forEach(project => {
        let projectOrganizer = new Project(project.innerText, []);
        console.log(projectOrganizer);
      })
    };


  })();

  const chooseProject = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
  }
  
  projectList.forEach(project => {
    project.addEventListener('click', chooseProject, false);
  });

})();

