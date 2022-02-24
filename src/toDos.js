import { toDoForm, toDoList, addToDoListItemToThingsToDo, projectForm } from './forms.js';
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
          console.log(toDoList[i])
        }
      }
    } else if (this.classList.contains('fa-square-check')) {
      this.classList.remove('fa-square-check');
      this.classList.add('fa-square');
      for(let i = 0; i < toDoList.length; i++) {
        if(toDoList[i].title === toDoToCheck) {
          toDoList[i].complete = false;
        }
      }
    }
  }

  return {markToDoAsComplete}
})()

export { toDoInteractions }