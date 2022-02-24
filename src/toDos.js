import { toDoForm, toDoList, addToDoListItemToThingsToDo, projectForm, clearThingsToDoBeforeRepopulation } from './forms.js';
import { storageAvailable, autoPopulateThingsToDo, autoPopulateProjects } from './index.js';
import { projectInteractions, Project } from './projects.js';

const toDoInteractions = (() => {
  const checkBox =  document.querySelectorAll('.checkbox');

  const markToDoAsComplete = function () {
    let toDoToCheck = this.nextSibling.textContent;
    if(this.classList.contains('fa-square')) {
      this.classList.remove('fa-square');
      this.classList.add('fa-square-check');
      for(let i = 0; i < toDoList.length; i++) {
        if(toDoList[i].title === toDoToCheck) {
          toDoList[i].complete = true;
          localStorage.removeItem(toDoList[i].title);
          localStorage.setItem(`${toDoList[i].title}`, JSON.stringify(toDoList[i]));
        }
      }
    } else if (this.classList.contains('fa-square-check')) {
      this.classList.remove('fa-square-check');
      this.classList.add('fa-square');
      for(let i = 0; i < toDoList.length; i++) {
        if(toDoList[i].title === toDoToCheck) {
          toDoList[i].complete = false;
          localStorage.removeItem(toDoList[i].title);
          localStorage.setItem(`${toDoList[i].title}`, JSON.stringify(toDoList[i]));
        }
      }
    }
    projectInteractions.clearProjectContainerDivBeforeRepopulation();
    autoPopulateThingsToDo();
    autoPopulateProjects();
  }

  return {markToDoAsComplete}
})()

export { toDoInteractions }